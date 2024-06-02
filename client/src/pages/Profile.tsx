import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState<{ avatar?: string }>({});

  const profileRef = useRef<HTMLInputElement>(null);

  const handleUseRef = () => profileRef?.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const date = new Date();
    const fileName = date.getTime() + file.name; // create unique file name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100;
        setFilePercentage(Math.round(progress));
      },
      // if error
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={handleFileChange}
          type="file"
          className="hidden"
          ref={profileRef}
          accept="image/*"
        />
        <img
          onClick={handleUseRef}
          src={formData.avatar ?? currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-small self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <label htmlFor="username">
          <input
            id="username"
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg w-full"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            placeholder="email"
            className="border p-3 rounded-lg w-full"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="text"
            placeholder="password"
            className="border p-3 rounded-lg w-full"
          />
        </label>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
