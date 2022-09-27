const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");
const districtSelect = document.getElementById("district");
const subdistrictSelect = document.getElementById("subdistrict");
const resultElement = document.getElementById("result");

const getProvince = 
    async () => {
        const response = await fetch(
            'https://ibnux.github.io/data-indonesia/provinsi.json'
        );
        const data = await response.json();
        return data;
    }
;

const getCity = 
    async (id) => {
        const response = await fetch(
            `https://ibnux.github.io/data-indonesia/kabupaten/${id}.json`
        );
        const data = await response.json();
        return data;
    }
;

const getDistrict = 
    async (id) => {
        const response = await fetch(
            `https://ibnux.github.io/data-indonesia/kecamatan/${id}.json`
        );
        const data = await response.json();
        return data;
    }
;

const getSubdistrict = 
    async (id) => {
        const response = await fetch(
        `https://ibnux.github.io/data-indonesia/kelurahan/${id}.json`
        );
        const data = await response.json();
        return data;
    }
;
  
const getResult = 
    async (key) => {
        const response = await fetch(
            `https://kodepos.vercel.app/search?q=${key}`);
        const data = await response.json();
        return data;
    }
;

const removeData = (e) => {
    while (e.hasChildNodes()) {
      e.removeChild(e.firstChild);
    }
};

const displayProvince = async () => {
    const options = await getProvince();
    provinceSelect.value = options[0];
    options.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.text = element.nama;
        provinceSelect.appendChild(newOption);
    });
    displayCity();
};

const displayCity = async () => {
    removeData(citySelect);
    const options = await getCity(provinceSelect.value);
    citySelect.value = options[0];
    options.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.text = element.nama;
        citySelect.appendChild(newOption);
    });
    displayDistrict();
};

const displayDistrict = async () => {
    removeData(districtSelect);
    const options = await getDistrict(citySelect.value);
    districtSelect.value = options[0];
    options.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.text = element.nama;
        districtSelect.appendChild(newOption);
    });
    displaySubdistrict();
};

const displaySubdistrict = async () => {
    removeData(subdistrictSelect);
    const options = await getSubdistrict(districtSelect.value);
    subdistrictSelect.value = options[0];
    options.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.text = element.nama;
        subdistrictSelect.appendChild(newOption);
    });
    displayResult();
};

const displayResult = async () => {
    resultElement.innerHTML = "memuat...";
  
    const results = await getResult(
      subdistrictSelect.options[subdistrictSelect.selectedIndex].text
    );
    if (results.data.length <= 0) {
      resultElement.innerHTML = "tidak ditemukan data";
    } else {
      resultElement.innerHTML = results.data[0].postalcode;
    }
};

displayProvince();

