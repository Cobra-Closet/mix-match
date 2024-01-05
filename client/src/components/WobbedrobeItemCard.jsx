import { func } from "prop-types";
import React, { useState } from "react";
import {
  requestWobbedrobeDelete,
  requestWobbedrobeUpdate,
} from "../utils/fetchRequests/wobbedrobe";
import { useDispatch, useSelector } from "react-redux";
import { requestGetUser } from "../utils/fetchRequests/user";
import { userLogin } from "../utils/reducers/statusSlice";
import "../styles/WobbedrobeItemCard.scss";
import styles from "../clothesData/style.json";
import materials from "../clothesData/materials.json";

// this component receives 2 props. the itemType (top, bottom, shoe, etc) and the item which has all the details of the item (style, material, url, etc)
export default function WobbedrobeItemCard({ itemType, item }) {
  console.log("this is item prop passed to WobbedrobeItemCard", item);
  const { color, category, style, material, photo_url } = item;
  const userId = useSelector((state) => state.status.user).user_id;

  const [editColor, setEditColor] = useState(false);
  const [editStyle, setEditStyle] = useState(false);
  const [editMaterial, setEditMaterial] = useState(false);
  // use stae for card flip
  const [isFlipped, setIsFlipped] = useState(false);

  const dispatch = useDispatch();

  const colorProps = {
    color,
    userId,
    itemType: itemType + (itemType === "shoes" ? "" : "s"),
    itemId: item[`${itemType}_id`],
    editColor,
    setEditColor,
  };
  const styleProps = {
    style,
    userId,
    itemType: itemType + (itemType === "shoes" ? "" : "s"),
    itemId: item[`${itemType}_id`],
    editStyle,
    setEditStyle,
  };
  const materialProps = {
    material,
    userId,
    itemType: itemType + (itemType === "shoes" ? "" : "s"),
    itemId: item[`${itemType}_id`],
    editMaterial,
    setEditMaterial,
  };

  // handler for card flip
  const flipCard = () => {
    // will invert isFlipped - if it's set to true, it'll be false and vice versa
    setIsFlipped(!isFlipped);
  };
  // need the img url here will need to get specific property name from object to replace imgUrl
  const hasImg = item.photo_url;
  console.log("this is hasImg", hasImg);

  return (
    // if hasImg is true, the card will be flippable, the handler will be called. otherwise it's not flippable
    <div className={`item-card ${hasImg ? flipCard : null}`} onClick={flipCard}>
      {hasImg ? (
        isFlipped ? (
          // card back details
          <div className="card-back">
            <div className="header">
              <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
              <button
                className="delete"
                onClick={async () => {
                  if (process.env.NODE_ENV === "production") {
                    await requestWobbedrobeDelete(
                      itemType + (itemType === "shoes" ? "" : "s"),
                      item[`${itemType}_id`]
                    );
                    const updatedUser = await requestGetUser(userId);
                    dispatch(userLogin(updatedUser));
                  }
                }}
              >
                DELETE
              </button>
            </div>
            <ColorRow {...colorProps} />
            <StyleRow {...styleProps} />
            {itemType !== 'shoes' && <MaterialRow {...materialProps} />}
          </div>
        ) : (
          // card front
          <div className="card-front">
            <img
              src={hasImg}
              // maxWidth={250}
              // maxHeight={250}
              alt={`${item.category} image`}
            />
          </div>
        )
      ) : (
        // if there's no image, nonflippable card only with details
        <div className="card-details">
          <div className="header">
            <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
            <button
              className="delete"
              onClick={async () => {
                if (process.env.NODE_ENV === "production") {
                  await requestWobbedrobeDelete(
                    itemType + (itemType === "shoes" ? "" : "s"),
                    item[`${itemType}_id`]
                  );
                  const updatedUser = await requestGetUser(userId);
                  dispatch(userLogin(updatedUser));
                }
              }}
            >
              DELETE
            </button>
          </div>
          <ColorRow {...colorProps} />
          <StyleRow {...styleProps} />
          {itemType !== 'shoes' && <MaterialRow {...materialProps} />}
        </div>
      )}
    </div>
    // <div className='item-card' onClick={hasImg ? flipCard : setIsFlipped}>
    //   <div className='card-front'>
    //     <img src={item.imgUrl} />
    //   </div>
    //   {/* this is going to be the back of thee card. */}
    //   <div className='header'>
    //     <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
    //     <button
    //       className='delete'
    //       onClick={async () => {
    //         if (process.env.NODE_ENV === 'production') {
    //           await requestWobbedrobeDelete(
    //             itemType + (itemType === 'shoes' ? '' : 's'),
    //             item[`${itemType}_id`]
    //           );
    //           const updatedUser = await requestGetUser(userId);
    //           dispatch(userLogin(updatedUser));
    //         }
    //       }}
    //     >
    //       DELETE
    //     </button>
    //   </div>

      // <ColorRow {...colorProps} />
      // <StyleRow {...styleProps} />
      // {itemType !== 'shoes' && <MaterialRow {...materialProps} />}
    // </div>
  );
}

function ColorRow({
  color,
  userId,
  itemType,
  itemId,
  editColor,
  setEditColor,
}) {
  const dispatch = useDispatch();
  const [updatedColor, setUpdatedColor] = useState(color);
  return (
    <div className="flex-row">
      <div className="flex-item key color">
        <p>color</p>
      </div>
      {editColor && (
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: "color",
              updatedProperty: e.target.updatedColor.value,
            };
            if (process.env.NODE_ENV === "production") {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditColor(false);
          }}
        >
          <input
            type="color"
            className="flex-item value color"
            value={updatedColor}
            onChange={(e) => setUpdatedColor(e.target.value)}
            name="updatedColor"
          />
          <input type="submit" value="SAVE" className="flex-item edit" />
        </form>
      )}
      {!editColor && (
        <div
          className="flex-item value color"
          style={{
            backgroundColor: color,
          }}
        ></div>
      )}
      {!editColor && (
        <button className="flex-item edit" onClick={() => setEditColor(true)}>
          EDIT
        </button>
      )}
    </div>
  );
}

function StyleRow({
  style,
  userId,
  itemType,
  itemId,
  editStyle,
  setEditStyle,
}) {
  const dispatch = useDispatch();
  return (
    <div className="flex-row">
      <div className="flex-item key style">
        <p>style</p>
      </div>
      {editStyle && (
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: "style",
              updatedProperty: e.target.updatedStyle.value,
            };
            if (process.env.NODE_ENV === "production") {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditStyle(false);
          }}
        >
          <select name="updatedStyle">
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input type="submit" value="SAVE" className="flex-item edit" />
        </form>
      )}
      {!editStyle && (
        <div className="flex-item value style">
          <p>{style}</p>
        </div>
      )}
      {!editStyle && (
        <button className="flex-item edit" onClick={() => setEditStyle(true)}>
          EDIT
        </button>
      )}
    </div>
  );
}

function MaterialRow({
  material,
  userId,
  itemType,
  itemId,
  editMaterial,
  setEditMaterial,
}) {
  const dispatch = useDispatch();
  return (
    <div className="flex-row">
      <div className="flex-item key material">
        <p>material</p>
      </div>
      {editMaterial && (
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: "material",
              updatedProperty: e.target.updatedMaterial.value,
            };
            if (process.env.NODE_ENV === "production") {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditMaterial(false);
          }}
        >
          <select name="updatedMaterial">
            {materials.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
          <input type="submit" value="SAVE" className="flex-item edit" />
        </form>
      )}
      {!editMaterial && (
        <div className="flex-item value material">
          <p>{material}</p>
        </div>
      )}
      {!editMaterial && (
        <button
          className="flex-item edit"
          onClick={() => setEditMaterial(true)}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
