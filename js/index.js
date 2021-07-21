//fake data
const data = ["Việt Nam", "Lào", "Campuchia", "Myanmar", "Thái Lan", "Indonesia", "Malaysia", "Philipine", "Đông Timor"];
//khai báo dom
let selectList = document.getElementById('selectList'),
    selectListContent = document.getElementById('selectListContent'),
    dropdownList = document.getElementById('dropdownList'),
    searchInput = document.getElementById('searchInput');
//gán sự kiện toàn trang
function initEvent() {

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('dropdown__item')) {
            toggleDropdown(true);
        } else if (event.target == selectListContent || event.target == searchInput || event.target == selectList) {
            if (dropdownList.style.display == "block") {
                toggleDropdown(false)
            } else {
                loadDropdown(data);
                toggleDropdown(true)
            };
        } else {
            toggleDropdown(false);
        }
    });

    searchInput.addEventListener('input', (event) => {
        toggleDropdown(false);
        let searchInputVal = event.target.value;
        let searchResult = data.filter(item => item.toLowerCase().includes(searchInputVal.trim().toLowerCase()));
        loadDropdown(searchResult);
        toggleDropdown(true);

    })
}
//cập nhật danh sách select item đã được chọn
function updateSelectItems(item) {
    item.lastElementChild.classList.toggle('display-none');
    let obj = JSON.parse(localStorage.getItem("selectItems"));
    let newKey = item.firstElementChild.innerHTML;
    if (obj[newKey]) {
        delete obj[newKey];
    } else {
        obj[newKey] = item.firstElementChild.innerHTML;
    }
    localStorage.setItem("selectItems", JSON.stringify(obj));
    loadSelectItems();
}
//load danh sách select item đã được chọn
function loadSelectItems() {
    selectListContent.innerHTML = "";
    let obj = JSON.parse(localStorage.getItem("selectItems"));
    if (!obj) {
        localStorage.setItem("selectItems", JSON.stringify({}));
    }
    for (key in obj) {
        let selectItem = document.createElement('div');
        selectItem.classList.add('select__item', 'mr-1', 'mx-1');
        selectItem.innerHTML = `<span class="my-1">${obj[key]}</span><span class="my-1"><i class="fas fa-times"></i></span>`;
        selectItem.childNodes[1].addEventListener('click', (event) => {
            let selectText = event.target.parentNode.previousSibling.innerText;
            if (obj[selectText]) {
                delete obj[selectText];
            }
            localStorage.setItem("selectItems", JSON.stringify(obj));
            loadSelectItems();
            loadDropdown(data);
        });
        selectListContent.appendChild(selectItem);
    }
    searchInput.value = "";
}
//load dropdown item
function loadDropdown(data) {
    let obj = JSON.parse(localStorage.getItem("selectItems"));
    dropdownList.innerHTML = "";
    if (data) {
        for (item of data) {
            let dropdownItem = document.createElement('div');
            dropdownItem.classList.add('dropdown__item');
            (obj && obj[item]) ? (dropdownItem.innerHTML = `<span>${item}</span><span><i class="fas fa-check"></i></span>`) :
            (dropdownItem.innerHTML = `<span>${item}</span><span class="display-none"><i class="fas fa-check"></i></span>`);
            dropdownItem.addEventListener('click', (event) => {
                updateSelectItems(event.target);
            });
            dropdownList.appendChild(dropdownItem);
        }
    }
}
//bật tắt dropdown
function toggleDropdown(isBlock) {
    (isBlock) ? (dropdownList.style.display = "block") : (dropdownList.style.display = "none");
}

//gọi hàm thực thi
toggleDropdown(false);
loadDropdown(data);
initEvent();
loadSelectItems();