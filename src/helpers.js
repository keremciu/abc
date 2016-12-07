const expander = function (array, parent, tree) {
    // first time build an array
    tree = typeof tree !== 'undefined' ? tree : [];
    // first time build an object which has ID property
    parent = typeof parent !== 'undefined' ? parent : { ID: 0 };

    // get all of the children of the item 
    const children = array.filter((child) => {
        if (child.parentID === undefined) {
            child.parentID = 0;
        }
        return child.parentID === parent.ID
    });

    // if it has children
    if (children) {
      // if ID = 0, it needs to be a starter
      if (parent.ID === 0) {
        tree = children;
      } else {
        parent.children = children;
      }
      children.map((child) => expander(array, child));
    }

    return tree;
}

export default expander;