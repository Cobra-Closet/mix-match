//page 5

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToPage, userLogin } from '../../utils/reducers/statusSlice';
import categories from '../../clothesData/categories.json';
import materials from '../../clothesData/materials.json';
import styles from '../../clothesData/style.json';
import { requestWobbedrobeAdd } from '../../utils/fetchRequests/wobbedrobe';
import { requestGetUser } from '../../utils/fetchRequests/user';

//upload clothes
import axios from "axios";
import '../../styles/AddToWobbeDrobe.scss';


export default function AddToWobbeDrobe() {
  //upload clothes
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    color: "",
    style: "",
    material: "",
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
    // const formData = new FormData();
    // formData.append("image", image);
    const completeFormData = new FormData();
    completeFormData.append("image", image);
    Object.keys(formData).forEach((key) => {
      completeFormData.append(key, formData[key]);
    });

    try {
      // Post to your endpoint for adding wobbedrobe item
      const res = await axios.post("/wobbedrobe/add", completeFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // If you need to update the user data in the redux store
      const updatedUser = await requestGetUser(user.user_id);
      dispatch(userLogin(updatedUser));

      // const res = await axios.post("/wobbedrobe/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // Handle the response, e.g., display the uploaded image URL
      console.log(res.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  if (page === 'ADD_TO_WOBBEDROBE')
  return (
    <div className="add-to-wobbedrobe">
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
            <p>You are adding a new entry of {selection} to your Wobbedrobe</p>
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
          </div>
        )}

        {!selection && (
          <div className="itemType-buttons">
            <input
              type="file"
              name="photo"
              content="Upload File"
              onChange={handlePhotoChange}
              cursor="pointer"
              size="90"
            />
            {/* ... */}
          </div>
        )}

        {/* Image upload input */}
        <div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
              {/* <form
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
} */}
