// Storage Controller
const StorageCtrl = (function () {
  // Public Methods
  return {
    storeItem: (item) => {
      let items = [];
      if (localStorage.getItem("items") === null) {
        items.push(item);
      } else {
        items = JSON.parse(localStorage.getItem("items"));
        items.push(item);
      }
      localStorage.setItem("items", JSON.stringify(items));
    },
    getItemsFromStorage: () => {
      let items = [];
      if (localStorage.getItem("items") !== null) {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    updateItemStorage: (updatedItem) => {
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: (id) => {
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: () => {
      localStorage.removeItem("items");
    },
  };
})();

// Item Controller
const ItemCtrl = (function () {
  class Item {
    constructor(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
  }
  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    getItems: () => {
      return data.items;
    },
    getTotalCalories: () => {
      let total = 0;
      data.items.forEach((item) => {
        total += item.calories;
      });
      data.totalCalories = total;
      return total;
    },
    getItemById: (id) => {
      let found = null;
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    addItem: (name, calories) => {
      let ID;
      // Create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);
      const newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    logData: () => {
      return data;
    },
    setCurrItem: (item) => {
      data.currentItem = item;
    },
    getCurrItem: () => {
      return data.currentItem;
    },
    updateItem: (name, calories) => {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: (id) => {
      // Get Ids
      const ids = data.items.map(function (item) {
        return item.id;
      });
      // Get index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: () => {
      data.items = [];
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemsList: "#items-list",
    listItems: "#items-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  // Public methods
  return {
    populateItemsList: (items) => {
      let html = ``;
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
                </li>`;
      });
      document.querySelector(UISelectors.itemsList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: () => {
      return UISelectors;
    },
    addListItem: (item) => {
      document.querySelector(UISelectors.itemsList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
      // Insert Item
      document
        .querySelector(UISelectors.itemsList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: () => {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrItem().calories;
      UICtrl.showEditState();
    },
    hideList: () => {
      document.querySelector(UISelectors.itemsList).style.display = "none";
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    setInitialState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).disabled = "";
    },
    showEditState: () => {
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).disabled = "true";
    },
    updateListItems: (updatedItem) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // convert NodeList to Array
      listItems = Array.from(listItems);
      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute("id");
        if (itemId === `item-${updatedItem.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
        }
      });
    },
    deleteListItem: (id) => {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    removeAllItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach((listItem) => {
        listItem.remove();
      });
    },
  };
})();

// App Controller
const AppCtrl = (function (StorageCtrl, ItemCtrl, UICtrl) {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    document
      .querySelector(UISelectors.itemsList)
      .addEventListener("click", itemEditClick);
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.setInitialState);
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };
  // Add Item Submit
  const itemAddSubmit = function (e) {
    e.preventDefault();

    // Get form input from ui controller
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      // get and show total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      // Store in local storage
      StorageCtrl.storeItem(newItem);
      // clear Fields
      UICtrl.clearInput();
    }
  };
  const itemEditClick = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("edit-item")) {
      // Get List Item id
      const listId = e.target.parentNode.parentNode.id;
      // Get Just the id  e.g  id="item-0" ==> 0
      const id = parseInt(listId.split("-")[1]);
      // Get Item object
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrItem(itemToEdit);
      // Add Item To Form   name & calories
      UICtrl.addItemToForm();
    }
  };
  const itemUpdateSubmit = function (e) {
    e.preventDefault();
    // Get Input
    const input = UICtrl.getItemInput();
    //   Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItems(updatedItem);
    // Update total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    // Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    // back to initial State
    UICtrl.setInitialState();
  };
  const itemDeleteSubmit = function (e) {
    e.preventDefault();
    const currentItem = ItemCtrl.getCurrItem();
    ItemCtrl.deleteItem(currentItem.id);
    // Delete From UI
    UICtrl.deleteListItem(currentItem.id);
    // Update total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    // Delete Item From Local Storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    // back to initial State
    UICtrl.setInitialState();
  };
  const clearAllItemsClick = function (e) {
    e.preventDefault();
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Delete all items from UI
    UICtrl.removeAllItems();
    // Update total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    // Clear Items From Storage
    StorageCtrl.clearItemsFromStorage();

    UICtrl.hideList();
  };
  // Public methods
  return {
    init: () => {
      // Set initial State
      UICtrl.setInitialState();
      // fetch items from data structure
      const items = ItemCtrl.getItems();
      // check If any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // populate list with  items
        UICtrl.populateItemsList(items);
      }
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      // Load event listeners
      loadEventListeners();
    },
  };
})(StorageCtrl, ItemCtrl, UICtrl);

AppCtrl.init();
