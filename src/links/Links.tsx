// import required libraries
import { FunctionComponent } from "react";

// import linkItems from the data folder
import { linkItems, linkItemProp } from "../data/linkItems";

/**
 * This function will construct a React.Component which contain the social media information
 * e.g. github, linkedin, ins, twitter.
 * In addition, you could change this to any prefer platforms but remember to store a image under img
 * folder or other specified location.
 * @returns LinkContainer<React.Component>
 */
const LinkContainer: FunctionComponent = () => {
  return (
    // define the social media links main container
    <div className="link-container">
      {/* Mapping each item from the linkItems array */}
      {linkItems.map((linkItem: linkItemProp) => {
        return (
          <div className="link-item" key={linkItem.alt}>
            <a href={linkItem.href}>
              <img src={linkItem.image} alt={linkItem.alt} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

// export the React.Component
export default LinkContainer;
