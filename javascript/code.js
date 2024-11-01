function openDiv(...idShow) {
    for (var id of idShow) {
        var element = document.getElementById(id); // Get the element by ID
        element.style.display = "block"
    }
}
function closeDiv(...idHide) {
    for (var id of idHide) {
        var element = document.getElementById(id); // Get the element by ID
        element.style.display = "none"
    }
}

setInterval(showTime, 1000);

function showTime() {
    let time = new Date();
    let hour = time.getUTCHours() - 3; // Adjust to GMT-3
    let min = time.getUTCMinutes();
    let sec = time.getUTCSeconds();

    // Ensure hour is in the correct range (0-23)
    if (hour < 0) {
        hour += 24; // Adjust for negative hours
    } else if (hour >= 24) {
        hour -= 24; // Adjust for hours exceeding 24
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":" + min + ":" + sec;

    document.getElementById("headerInfoClock").innerHTML = currentTime;
}

// Function to open the modal
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex"; // Show the modal
    modalImage.src = imgElement.src; // Set the source of the modal image
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Hide the modal
}

//SHOP

const shopNameAux = document.getElementById('placeName');
const shopDivNameAux = document.getElementsByClassName('shopDivName');
const assetGridAux = document.getElementsByClassName('assetGrid');

fetch('../json/shops.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(d => { //for each block in the json, do
            if (shopNameAux && d.shop_name === shopNameAux.innerText.toLowerCase()) { //if the shop name in the html page is the same as the json block's shop name, do
                const shopDivArray = Array.from(shopDivNameAux); //transforms the shopDivNameAux into a proper array to make it possible to do forEach
                shopDivArray.forEach(shopDiv => { //for each element in the array of shopDivs, do
                    if (shopDiv.innerText.toLowerCase() === d.shop_div_name) { //if the shopDiv text corresponds to the name in the json block, do
                        const shopDivAncestor = shopDiv.closest('.shopDiv'); //finds shopDivName's parent with shopDiv class
                        const shopDivGrid = shopDivAncestor.querySelector('.assetGrid'); //finds assetGrid with help of parent

                        //creates assetBlock with info
                        var newAsset = document.createElement('div'); //new div for asset
                        newAsset.className = 'assetBlock'; //gives class to the new div

                        if (d.URL != '') { //if URL exists, creates image with said url
                            const newImg = document.createElement('img');
                            newImg.className = 'assetImg';
                            newImg.src = d.URL;
                            newAsset.appendChild(newImg);
                        }
                        if (d.description != '') { //if description exists, creates description
                            const newDescription = document.createElement('div');
                            newDescription.className = 'assetImgAlt';
                            newDescription.innerHTML = d.description;
                            newAsset.appendChild(newDescription);
                        }
                        if (d.name != '') { //if name exists, create name text
                            const newNameDiv = document.createElement('div');
                            const newName = document.createElement('h2');
                            newName.innerHTML = d.name;
                            newNameDiv.className = ('assetName');
                            newNameDiv.appendChild(newName);
                            newAsset.appendChild(newNameDiv);
                        }
                        if (d.price != '') { //if price exists, create price text
                            const priceDiv = document.createElement('div');
                            priceDiv.className = 'assetPrice';

                            if (d.currency_type != '') {
                                var priceType = document.createElement('img');
                                priceType.src = d.currency_type;
                            }

                            priceDiv.textContent = `${d.price} `;
                            priceDiv.appendChild(priceType);

                            newAsset.appendChild(priceDiv);
                        }
                        if (d.found_at != '') { //if it is found somewhere specific
                            const foundDiv = document.createElement('div');
                            const foundLink = document.createElement('a');
                            const foundImg = document.createElement('img');

                            foundDiv.className = 'foundAt';
                            foundImg.src = d.found_img;

                            const txtBefore = document.createTextNode('found at\u00A0');
                            const txtAfter = document.createTextNode(`\u00A0${d.found_at}`)

                            if (d.found_link != '') {
                                foundLink.href = d.found_link;

                                foundLink.appendChild(txtBefore);
                                foundLink.appendChild(foundImg);
                                foundLink.appendChild(txtAfter);

                                foundDiv.appendChild(foundLink);
                            }
                            else {
                                foundDiv.appendChild(txtBefore);
                                foundDiv.appendChild(foundImg);
                                foundDiv.appendChild(txtAfter);
                            }

                            newAsset.appendChild(foundDiv);
                        }
                        if (d.used_on != '') { //if it is used somewhere specific
                            const usedDiv = document.createElement('div');
                            const usedLink = document.createElement('a');
                            const usedImg = document.createElement('img');

                            usedDiv.className = 'usedOn';
                            usedImg.src = d.used_img;

                            const txtBefore = document.createTextNode('used on\u00A0');
                            const txtAfter = document.createTextNode(`\u00A0${d.used_on}`)

                            if (d.used_link != '') {
                                usedLink.href = d.used_link;

                                usedLink.appendChild(txtBefore);
                                usedLink.appendChild(usedImg);
                                usedLink.appendChild(txtAfter);

                                usedDiv.appendChild(usedLink);
                            }
                            else {
                                usedDiv.appendChild(txtBefore);
                                usedDiv.appendChild(usedImg);
                                usedDiv.appendChild(txtAfter);
                            }

                            newAsset.appendChild(usedDiv);
                        }
                        shopDivGrid.appendChild(newAsset);

                    }
                })
            }
        });
    });

    //INCLUDING HEADER AND LEFT INDEX
fetch('../includes/header.html')
    .then(response => response.text())
    .then(data => {
        var headerDoc = data.toString();
        const startTrimIndex = headerDoc.indexOf('<body>');

        headerDoc = headerDoc.slice(startTrimIndex + '<body>'.length);
        headerDoc = headerDoc.split('<!--trim here-->')[0];

        document.getElementById('header').innerHTML = headerDoc;
    });

fetch('../includes/leftIndex.html')
    .then(response => response.text())
    .then(data => {
        var headerDoc = data.toString();
        const startTrimIndex = headerDoc.indexOf('<body>');

        headerDoc = headerDoc.slice(startTrimIndex + '<body>'.length);
        headerDoc = headerDoc.split('<!--trim here-->')[0];

        document.getElementById('leftIndex').innerHTML = headerDoc;
    });