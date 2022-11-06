let addressBookContactList;
window.addEventListener("DOMContentLoaded", () => {
    addressBookContactList = getAddressBookContactListFromStorage();
    document.querySelector(".person-count").textContent = addressBookContactList.length;
    createInnerHtml();
    localStorage.removeItem("PersonToEdit");
});

const getAddressBookContactListFromStorage = () => {
    return localStorage.getItem("AddressBookList") ?
        JSON.parse(localStorage.getItem("AddressBookList")) : [];
};

const createInnerHtml = () => {
    const headerHtml =
        "<th>FullName</th>" +
        "<th>Address</th>" +
        "<th>City</th>" +
        "<th>State</th>" +
        "<th>Zip Code</th>" +
        "<th>Phone Number</th>" +
        "<th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (let contactData of addressBookContactList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${contactData._fullName}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._state}</td>
            <td>${contactData._zip}</td>
            <td>${contactData._phoneNumber}</td>
            <td>
                <img id="${contactData._id}" onclick="remove(this)" alt="delete" src="..//assets/icons/delete-black-18dp.svg">
                <img id="${contactData._id}" onclick="update(this)" alt="edit" src="..//assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const remove = (node) => {
    let contactData = addressBookContactList.find(contact => contact._id == node.id);
    if (!contactData) return;
    const index = addressBookContactList.map(contact => contact._id).indexOf(contactData._id);
    addressBookContactList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookContactList));
    document.querySelector(".person-count").textContent = addressBookContactList.length;
    createInnerHtml();
};

const update = (node) => {
    let contactData = addressBookContactList.find(contact => contact._id == node.id);
    if (!contactData) return;
    localStorage.setItem("PersonToEdit", JSON.stringify(contactData));
    window.location.replace(site_properties.add_address_book_form_page);
};