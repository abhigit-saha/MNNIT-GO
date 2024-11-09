import { Redis } from "ioredis";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";

const redis = Redis.createClient();

// export const verifyCredential = asyncHandler(async (req, res) => {
//   const { credential } = req.body;

//   if (!credential) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, null, "Credential is required"));
//   }

//   let allCredentials = await redis.lrange("credentials", 0, -1);

//   allCredentials = allCredentials.map((c) => JSON.parse(c));
//   // const credentialDoc = allCredentials.find(
//   //   (c) => c.credential == credential && c.used == false
//   // );
//   console.log(allCredentials);
//   console.log("Credential", credential);
//   const allCredentialName = allCredentials.map((c) => ({
//     credential: c.credential,
//     used: c.used,
//   }));
//   console.log("fine here 1");
//   const credentialDoc = allCredentialName.find(
//     (c) => c?.credential === credential && c?.used === false
//   );
//   console.log("fine here 1");

//   console.log("All Credential Name: ", allCredentialName);
//   // .find((c) => c.credential == credential && c.used == false);

//   console.log("Credential Doc: ", credentialDoc);

//   if (!credentialDoc) {
//     return res
//       .status(404)
//       .json(new ApiResponse(404, null, "Invalid or already used credential"));
//   }

//   // Mark as used
//   credentialDoc.used = true;
//   // Remove old version and add updated version
//   await redis.lrem(
//     "credentials",
//     1,
//     JSON.stringify({ ...credentialDoc, used: false })
//   );
//   await redis.lpush("credentials", JSON.stringify(credentialDoc));

//   return res
//     .status(200)
//     .json(new ApiResponse(200, null, "Credential verified successfully"));
// });
export const verifyCredential = asyncHandler(async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential || typeof credential !== "string") {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Valid credential string is required")
        );
    }
    console.log("Credential", credential);
    const allCredentials = await redis.lrange("credentials", 0, -1);

    const parsedCredentials = allCredentials.reduce((acc, entry) => {
      try {
        const parsed = JSON.parse(entry);
        if (parsed && typeof parsed === "object" && parsed.credential) {
          acc.push(parsed);
        }
      } catch (error) {
        console.error("Error parsing credential:", error.message);
      }
      return acc;
    }, []);

    console.log("parsed credentials: ", parsedCredentials);
    const trimmedCredential = credential.trim();
    const credentialDoc = parsedCredentials.find(
      (c) => c.credential === credential && c.used === false
    );
    if (!credentialDoc) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Invalid or already used credential"));
    }

    const multi = redis.multi();

    multi.lrem("credentials", 1, JSON.stringify(credentialDoc));

    const updatedCredential = { ...credentialDoc, used: true };
    multi.lpush("credentials", JSON.stringify(updatedCredential));

    await multi.exec();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Credential verified successfully"));
  } catch (error) {
    console.error("Credential verification error:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, "Error processing credential verification")
      );
  }
});

export const createCredential = asyncHandler(async (req, res) => {
  const { credential, username } = req.body;

  if (!credential || !username) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Both credential and username are required.")
      );
  }

  try {
    const allCredentials = await redis.lrange("credentials", 0, -1);
    const exists = allCredentials
      .map((c) => JSON.parse(c))
      .some((c) => c.credential === credential);

    if (exists) {
      return res
        .status(409)
        .json(
          new ApiResponse(409, null, "Credential already exists for this user")
        );
    }

    const newCredential = {
      credential,
      username,
      used: false,
    };

    await redis.lpush("credentials", JSON.stringify(newCredential));

    return res
      .status(201)
      .json(new ApiResponse(201, newCredential, "Created the credential"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while creating the credential"
        )
      );
  }
});
