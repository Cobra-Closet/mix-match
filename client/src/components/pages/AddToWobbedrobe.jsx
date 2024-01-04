//page 5

import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goToPage, userLogin } from "../../utils/reducers/statusSlice";
import categories from "../../clothesData/categories.json";
import materials from "../../clothesData/materials.json";
import styles from "../../clothesData/style.json";
import { requestWobbedrobeAdd } from "../../utils/fetchRequests/wobbedrobe";
import { requestGetUser } from "../../utils/fetchRequests/user";



//upload clothes
import axios from "axios";
import "../../styles/AddToWobbeDrobe.scss";

export default function AddToWobbeDrobe() {
  //upload clothes
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    user_id: null,
    category: "",
    color: "",
    style: "",
    material: "",
    image: null
  });

  const [selection, setSelection] = useState(null);

  const page = useSelector((state) => state.status.page);
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const completeFormData = new FormData();

    // check for user id
    if (user && user.user_id) {
      console.log('if conditional passed in AddToWobbedrobe for user && user.user_id', user.user_id);
      // append to completeFormData
      completeFormData.append("user_id", user.user_id);
    } else {
      console.error('User ID is missing');
      return;
    }

    // check if image was provided, add it to completedFormData
    if (image) completeFormData.append("image", image);
    console.log('this is image', image);
    // formData.append("image", image);
    // const completeFormData = new FormData();

    // append all other selections from user to completedFormData
    completeFormData.append("category", formData.category);
    completeFormData.append("color", formData.color);
    completeFormData.append("style", formData.style);
    // check if selection is not shoes
    if (selection !== "shoes") {
      completeFormData.append("material", formData.material);
    }

    // completeFormData.append("image", image);
    // Object.keys(formData).forEach((key) => {
    //   completeFormData.append(key, formData[key]);
    // });

    try {
      // Post to your endpoint for adding wobbedrobe item
      // will have to change this to call the requestWobbedrobeAdd with selection data and image data
      // const res = await axios.post("/wobbedrobe/add", completeFormData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // // If you need to update the user data in the redux store
      // const updatedUser = await requestGetUser(user.user_id);
      // dispatch(userLogin(updatedUser));

      // // const res = await axios.post("/wobbedrobe/upload", formData, {
      // //   headers: { "Content-Type": "multipart/form-data" },
      // // });
      // // Handle the response, e.g., display the uploaded image URL
      // console.log(res.data.imageUrl);

      // call requestWobbedrobeAdd with selection and completeFormData
      const response = await requestWobbedrobeAdd(selection, completeFormData);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  //add custom file/photo input button
  const fileInputRef = useRef(null);

  if (page === "ADD_TO_WOBBEDROBE")
    return (
      <div className="add-to-wobbedrobe">
        {/* handles submit when user submits their entry */}
        <form onSubmit={handleSubmit}>
          {!selection && (
            <div className="itemType-buttons">
              <button onClick={() => setSelection("tops")}>Top</button>
              <button onClick={() => setSelection("bottoms")}>Bottoms</button>
              <button onClick={() => setSelection("overalls")}>Overalls</button>
              <button onClick={() => setSelection("shoes")}>Shoes</button>
            </div>
          )}
          {selection && (
            <div>
              <p>
                You are adding a new entry of {selection} to your Wobbedrobe
              </p>
              {/* Form fields */}
              <div>
                <label>Category</label>
                <select name="category" onChange={handleInputChange}>
                  {categories[selection].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Color: </label>
                <input type="color" name="color" onChange={handleInputChange} />
              </div>
              {selection !== "shoes" && (
                <div>
                  <label>Material</label>
                  <select name="material" onChange={handleInputChange}>
                    {materials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label>Style</label>
                <select name="style" onChange={handleInputChange}>
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {/* HIDDEN Image upload input && Hidden Button for Custom Button */}
              <div>
                <input
                  type="file"
                  className="visually-hidden-input"
                  onChange={(e) => setImage(e.target.files[0])}
                  ref={fileInputRef}
                />
                {/* Custom File Upload Button */}
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  className="custom-img-button"
                >
                  Upload Image
                </button>
              </div>
              {/* will need image upload input here */}
              {/* <div>
                <label>Upload Image</label>
                <input
                  type="file"
                  className="visually-hidden-input"
                  onChange={(e) => setImage(e.target.files[0])}
                  ref={fileInputRef}
                />
              </div> */}
            </div>
          )}

          {!selection && (
            <div className="itemType-buttons">
              {/* <input
              type="file"
              name="photo"
              content="Upload File"
              onChange={handleSubmit}
              cursor="pointer"
              size="90"
            /> */}
              {/* ... */}
            </div>
          )}

          {/* HIDDEN Image upload input && Hidden Button for Custom Button */}
          {/* <div>
            <input
              type="file"
              className="visually-hidden-input"
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileInputRef}
            /> */}
            {/* Custom File Upload Button */}
            {/* <button
              type="button"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              className="custom-img-button"
            >
              Upload Image
            </button>
          </div> */}
          {/* <input type="submit" value="Upload"  /> */}
          {/* <input type="submit" value="Submit" /> */}
          {selection && <input type="submit" value="Submit" />}
        </form>
      </div>
    );
}
// {
  /* <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const body = {
                    user_id: user.user_id,
                    color: e.target.color.value,
                    category: e.target.category.value,
                    style: e.target.style.value,
                  };
                  if (selection !== "shoes")
                    body.material = e.target.material.value;
                  console.log(body);

                  if (process.env.NODE_ENV === "production") {
                    await requestWobbedrobeAdd(selection, body);
                    const updatedUser = await requestGetUser(user.user_id);
                    dispatch(userLogin(updatedUser));
                  }
                  setSelection(null);
                  dispatch(goToPage("HOME"));
                }}
              >
                <div>
                  <label>Category</label>
                  <select name="category">
                    {categories[selection].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Color: </label>
                  <input type="color" name="color" />
                </div>
                {selection !== "shoes" && (
                  <div>
                    <label>Material</label>
                    <select name="material">
                      {materials.map((mat) => (
                        <option key={mat} value={mat}>
                          {mat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label>Style</label>
                  <select name="style">
                    {styles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <input type="submit" />
              </form>
            </div>
          )}
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input type="submit" value="Upload" />
        </form>
      </div>
    );
} */
// }
