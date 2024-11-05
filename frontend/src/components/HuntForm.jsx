import React, { useState, useRef } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { json } from "react-router-dom";
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
import Timer from "./Timer";
import QrCode from "qrcode";
import Button from "./utils/Button";
function HuntForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    difficulty: "",
    locations: [],
  });

  const [currentLocation, setCurrentLocation] = useState("");
  const [isUploading, setIsUploading] = useState({});
  const [isUploadingHuntImage, setIsUploadingHuntImage] = useState(false);

  const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHuntImageUpload = async (file) => {
    setIsUploadingHuntImage(true);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataUpload
      );

      const imageUrl = response.data.secure_url;
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading hunt image:", error);
    } finally {
      setIsUploadingHuntImage(false);
    }
  };

  const generateQrCode = async (answer) => {
    try {
      // Generate the QR code as a data URL
      const dataUrl = await QrCode.toDataURL(answer);

      // Create an <a> element and set the download attribute
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Clue.png"; // File name for the download

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Clue QR code successfully generated and downloaded.");
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleImageUpload = async (file, locationIndex, clueIndex) => {
    setIsUploading({ locationIndex, clueIndex, status: true });

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        uploadFormData
      );

      const imageUrl = response.data.secure_url;

      setFormData((prevData) => {
        const updatedLocations = [...prevData.locations];
        updatedLocations[locationIndex].clues[clueIndex] = {
          ...updatedLocations[locationIndex].clues[clueIndex],
          image: imageUrl,
        };

        return {
          ...prevData,
          locations: updatedLocations,
        };
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading({});
    }
  };

  const addLocation = () => {
    if (currentLocation.trim()) {
      setFormData({
        ...formData,
        locations: [
          ...formData.locations,
          {
            name: currentLocation.trim(),
            clues: [
              {
                image: "",
                text: "",
                isUnlocked: false,
                answer: "",
                isQr: false,
              },
            ],
          },
        ],
      });
      setCurrentLocation("");
    }
  };

  const addClueToLocation = (locationIndex) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[locationIndex] = {
      ...updatedLocations[locationIndex],
      clues: [
        ...updatedLocations[locationIndex].clues,
        {
          image: "",
          text: "",
        },
      ],
    };

    setFormData({
      ...formData,
      locations: updatedLocations,
    });
  };

  const updateClue = (locationIndex, clueIndex, field, value) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[locationIndex].clues[clueIndex] = {
      ...updatedLocations[locationIndex].clues[clueIndex],
      [field]: value,
    };

    setFormData({
      ...formData,
      locations: updatedLocations,
    });
  };
  const toggleIsQr = (locationIndex, clueIndex) => {
    setFormData((prevData) => {
      const updatedLocations = [...prevData.locations];
      updatedLocations[locationIndex].clues[clueIndex] = {
        ...updatedLocations[locationIndex].clues[clueIndex],
        isQr: !updatedLocations[locationIndex].clues[clueIndex].isQr,
      };
      return {
        ...prevData,
        locations: updatedLocations,
      };
    });
  };
  const removeLocation = (indexToRemove) => {
    setFormData({
      ...formData,
      locations: formData.locations.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeClue = (locationIndex, clueIndex) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[locationIndex] = {
      ...updatedLocations[locationIndex],
      clues: updatedLocations[locationIndex].clues.filter(
        (_, index) => index !== clueIndex
      ),
    };
    setFormData({
      ...formData,
      locations: updatedLocations,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:4001/hunts",
    //     formData
    //   );
    //   console.log("Hunt created:", response.data);
    //   setFormData({
    //     name: "",
    //     title: "",
    //     image: "",
    //     locations: [],
    //   });
    // } catch (error) {
    //   console.error("Error creating hunt:", error);

    // }
    try {
      const response = await axios.post(
        "http://localhost:8000/hunts",
        formData
      );
      console.log("Hunt created:", response.data);
    } catch (error) {
      console.error("Error creating hunt:", error);
    }
    alert(JSON.stringify(formData));
  };
  return (
    <div className="card bg-base-100 w-full max-w-2xl shadow-md border border-gray-300 rounded-lg mx-auto">
      <div className="card-body p-6">
        <h2 className="card-title text-lg font-semibold mb-4 border-b border-gray-300 w-fit px-3 pb-1">
          Create New Hunt
        </h2>

        <form
          onSubmit={async (e) => await handleSubmit(e)}
          className="space-y-4"
        >
          {/* Basic hunt info fields */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Hunt Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Description</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input input-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Added Difficulty Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Difficulty</span>
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Hunt Image section remains the same */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Hunt Image</span>
            </label>
            <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
              <FileUploader
                handleChange={handleHuntImageUpload}
                name="file"
                types={fileTypes}
                maxSize={5}
                classes="w-full h-full"
              >
                {/* FileUploader content remains the same */}
                <div className="flex flex-col items-center justify-center h-full">
                  {isUploadingHuntImage ? (
                    <p className="text-blue-500">Uploading...</p>
                  ) : formData.image ? (
                    <div className="w-full h-full">
                      <img
                        src={formData.image}
                        alt="Hunt cover"
                        className="max-h-[150px] mx-auto object-contain"
                      />
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Drop new image to replace
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500">
                        Drag and drop an image here
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        or click to select a file
                      </p>
                    </>
                  )}
                </div>
              </FileUploader>
            </div>
          </div>

          {/* Locations & Clues section */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">
                Locations & Clues
              </span>
            </label>

            {/* Add Location Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="input input-bordered flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a location"
              />
              <button
                type="button"
                onClick={addLocation}
                className="btn btn-outline px-4 py-2 text-sm rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out"
              >
                Add Location
              </button>
            </div>

            {/* Locations List */}
            <div className="space-y-6">
              {formData.locations.map((location, locationIndex) => (
                <div
                  key={locationIndex}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-blue-800 text-lg">
                      {location.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => addClueToLocation(locationIndex)}
                        className="text-green-500 hover:text-green-700 text-sm"
                      >
                        Add Clue
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLocation(locationIndex)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove Location
                      </button>
                    </div>
                  </div>

                  {/* Clues for this location */}
                  <div className="space-y-4">
                    {location.clues.map((clue, clueIndex) => (
                      <div
                        key={clueIndex}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">
                            Clue {clueIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeClue(locationIndex, clueIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleIsQr(locationIndex, clueIndex)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            {clue.isQr ? "QR Enabled" : "Enable QR"}
                          </button>
                        </div>

                        <div className="space-y-3">
                          {/* Clue Image uploader remains the same */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-600">
                                Clue Image
                              </span>
                            </label>
                            <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
                              <FileUploader
                                handleChange={(file) =>
                                  handleImageUpload(
                                    file,
                                    locationIndex,
                                    clueIndex
                                  )
                                }
                                name="file"
                                types={fileTypes}
                                maxSize={5}
                                classes="w-full h-full"
                              >
                                <div className="flex flex-col items-center justify-center h-full">
                                  {isUploading.locationIndex ===
                                    locationIndex &&
                                  isUploading.clueIndex === clueIndex ? (
                                    <p className="text-blue-500">
                                      Uploading...
                                    </p>
                                  ) : clue.image ? (
                                    <div className="w-full h-full">
                                      <img
                                        src={clue.image}
                                        alt="Uploaded clue"
                                        className="max-h-[150px] mx-auto object-contain"
                                      />
                                      <p className="text-sm text-gray-500 text-center mt-2">
                                        Drop new image to replace
                                      </p>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-gray-500">
                                        Drag and drop an image here
                                      </p>
                                      <p className="text-sm text-gray-400 mt-1">
                                        or click to select a file
                                      </p>
                                    </>
                                  )}
                                </div>
                              </FileUploader>
                            </div>
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-600">
                                Clue Text
                              </span>
                            </label>
                            <input
                              type="text"
                              value={clue.text}
                              onChange={(e) =>
                                updateClue(
                                  locationIndex,
                                  clueIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                              className="input input-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter clue text"
                            />
                          </div>

                          {/* Added Answer Field */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-600">
                                Answer
                              </span>
                            </label>
                            <input
                              type="text"
                              value={clue.answer}
                              onChange={(e) =>
                                updateClue(
                                  locationIndex,
                                  clueIndex,
                                  "answer",
                                  e.target.value
                                )
                              }
                              className="input input-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter correct answer"
                              required
                            />
                          </div>
                          {clue.isQr && (
                            <div className="w-fit">
                              <Button
                                text="Generate Qr"
                                handleClick={() => generateQrCode(clue.answer)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full px-6 py-2 text-sm rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out"
          >
            Create Hunt
          </button>
        </form>
      </div>
    </div>
  );
}

export default HuntForm;
