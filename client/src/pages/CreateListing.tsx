export default function CreateListing() {
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
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="uppercase p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 w-full mt-4">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
