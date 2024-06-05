import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

type FormDataType = {
  imageUrls: string[];
};

export default function CreateListing() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState<string | boolean>(
    "" || false
  );
  const [uploading, setUploading] = useState(false);

  console.log(" formData ", formData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(files);
    }
  };

  const handleImageSubmit = () => {
    if (
      files &&
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      const promises: Promise<string>[] = [];
      setUploading(true);
      setImageUploadError(false);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(
            "Image upload failed (2 mb max per image)" + error
          );
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-1 flex-col gap-4 w-full">
          {/* Name, description */}
          <div className="gap-4 flex flex-col">
            <label className="" htmlFor="name">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="border p-3 rounded-lg w-full"
                maxLength={62}
                minLength={10}
                required
              />
            </label>

            <label className="w-full" htmlFor="description">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="border p-3 rounded-lg"
                rows={4}
                cols={50}
                required
              />
            </label>
            <label className="w-full" htmlFor="name">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="border p-3 rounded-lg w-full"
                required
              />
            </label>
          </div>
          {/* Name, description */}
          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4">
            <label htmlFor="flex gap-4 mr-3 border-solid border-2 border-green-500 align-center items-center">
              <div className="flex items-center gap-2">
                <input className="w-5 h-5" type="checkbox" id="sale" />{" "}
                <span className="">Sale</span>
              </div>
            </label>
            <label htmlFor="flex gap-2 mr-3 align-center">
              <div className="flex items-center gap-2">
                <input className="w-5 h-5" type="checkbox" id="rent" />{" "}
                <span>Rent</span>
              </div>
            </label>
            <label htmlFor="flex gap-2">
              <div className="flex items-center gap-2">
                <input className="w-5 h-5" type="checkbox" id="parking" />{" "}
                <span>Parking spot</span>
              </div>
            </label>
            <label htmlFor="flex gap-2">
              <div className="flex items-center gap-2">
                <input className="w-5 h-5" type="checkbox" id="furnished" />{" "}
                <span>Furnished</span>
              </div>
            </label>
            <label htmlFor="flex gap-2">
              <div className="flex items-center gap-2">
                <input className="w-5 h-5" type="checkbox" id="offer" />{" "}
                <span>Offer</span>
              </div>
            </label>
          </div>
          {/* Checkboxes */}
          {/* Bed/Baths */}
          <div className="flex gap-6 flex-wrap">
            <label htmlFor="bedrooms" className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </label>
            <label htmlFor="bathrooms" className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </label>

            {/* Bed/Baths */}
            {/* Price */}

            <label htmlFor="regularPrice" className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price </p>
                <span className="text-xs">($/Month)</span>
              </div>
            </label>

            <label htmlFor="discountPrice" className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                min={1}
                max={10}
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted</p>
                <span className="text-xs">($/Month)</span>
              </div>
            </label>

            {/* Price */}
          </div>
        </div>
        <div className="">
          <p className="font-semibold">
            <span className=" font-bold">Images:</span>{" "}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              onChange={handleFileChange}
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center mt-8"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-600 rounded-lg uppercase hover:opactity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="uppercase p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 w-full mt-4">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
