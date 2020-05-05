"use strict";
const changeCountry = document.querySelector("#jsChangeCountry");
const confirmerNumber = document.querySelector("#confirmer_number");
const deathsNumber = document.querySelector("#deaths_number");
const quarantineRelease = document.querySelector("#quarantine_release");
const duringTreatment = document.querySelector("#during_treatment");
const during_Treatment = document.querySelector("#during__treatment");
const rastDay = document.querySelector("#rast_day");
const rastDay2 = document.querySelector("#rast_day2");
const rastDay3 = document.querySelector("#rast_day3");
const rastDay4 = document.querySelector("#rast_day4");

let CONFIRMER_KOREA = "10,804";
let CONFIRMER_WORLD = "3,608,526";

let DEATHS_KOREA = "254";
let DEATHS_WORLD = "252,406";

let KO_QUARANTINE_RELEASE = "9,283";
let WO_QUARANTINE_RELEASE = "1,200,337";

let KO_DURING_TREATMENT = "1,267";

let KO_RAST_DAY = "(+3)";
let WO_RAST_DAY = "(+52,327)";

let KO_RAST_DAY2 = "(+2)";
let WO_RAST_DAY2 = "(+3,278)";

let KO_RAST_DAY3 = "(+66)";
let WO_RAST_DAY3 = "(+34,448)";

let KO_RAST_DAY4 = "(-65)";

let change = false;

confirmerNumber.innerText = CONFIRMER_KOREA;
deathsNumber.innerText = DEATHS_KOREA;
quarantineRelease.innerText = KO_QUARANTINE_RELEASE;
duringTreatment.innerText = KO_DURING_TREATMENT;
rastDay.innerText = KO_RAST_DAY;
rastDay2.innerText = KO_RAST_DAY2;
rastDay3.innerText = KO_RAST_DAY3;
rastDay4.innerText = KO_RAST_DAY4;

function onChangeCountry() {
  if (change === true) {
    change = false;
    changeCountry.innerText = "Korea";
    confirmerNumber.innerText = CONFIRMER_KOREA;
    deathsNumber.innerText = DEATHS_KOREA;
    quarantineRelease.innerText = KO_QUARANTINE_RELEASE;
    duringTreatment.innerText = KO_DURING_TREATMENT;
    rastDay.innerText = KO_RAST_DAY;
    during_Treatment.innerText = "치료 중";
    rastDay2.innerText = KO_RAST_DAY2;
    rastDay3.innerText = KO_RAST_DAY3;
    rastDay4.innerText = KO_RAST_DAY4;
  } else {
    change = true;
    changeCountry.innerText = "World";
    confirmerNumber.innerText = CONFIRMER_WORLD;
    deathsNumber.innerText = DEATHS_WORLD;
    quarantineRelease.innerText = WO_QUARANTINE_RELEASE;
    during_Treatment.innerText = "";
    duringTreatment.innerText = "";
    rastDay.innerText = WO_RAST_DAY;
    rastDay2.innerText = WO_RAST_DAY2;
    rastDay3.innerText = WO_RAST_DAY3;
    rastDay4.innerText = "";
  }
}

if (changeCountry) {
  changeCountry.addEventListener("click", onChangeCountry);
}

const localButton = document.querySelectorAll(".area1_button");
let i;

function onClickEvent() {
  let buttonColors = document.querySelector(".button_color_change");
  if (buttonColors) {
    buttonColors.classList.remove("button_color_change");
  }
  this.classList.add("button_color_change");
}

for (i = 0; i < localButton.length; i++) {
  localButton[i].addEventListener("click", onClickEvent);
}

function onClickEvent2() {
  let textColors = document.querySelector(".text_color_change");
  if (textColors) {
    textColors.classList.remove("text_color_change");
  }
  this.classList.add("text_color_change");
}

for (i = 0; i < localButton.length; i++) {
  localButton[i].addEventListener("click", onClickEvent2);
}

// 공적마스크 판매현황 정보
const remain_stats = {
  plenty: {
    index: 1,
    label: "100개 이상",
    color: "green",
  },
  some: {
    index: 2,
    label: "30개 이상 100개미만",
    color: "yellow",
  },
  few: {
    index: 3,
    label: "2개 이상 30개 미만",
    color: "red",
  },
  empty: {
    index: 4,
    label: "1개 이하",
    color: "gray",
  },
  break: {
    index: 5,
    label: "판매중지",
    color: "darkgray",
  },
};

// Element 탐색
const search_text = document.getElementById("search_text");
const search_btn = document.getElementById("search_btn");
const filter_list = document.getElementById("filter_list");
const mask_list = document.getElementById("mask_list");

// 입력창에서 엔터키 입력
search_text.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    search_btn.click();
  }
});

// 검색 버튼 클릭 이벤트
search_btn.addEventListener("click", handleSearch);

// 검색 필터링 생성
Object.keys(remain_stats).forEach(function (key) {
  const el_id = "filter-" + key;

  const li = document.createElement("li");

  const label_text = document.createTextNode(remain_stats[key].label);
  const label = document.createElement("label");
  label.setAttribute("for", el_id);
  label.appendChild(label_text);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "filter";
  checkbox.value = key;
  checkbox.id = el_id;
  checkbox.checked = true;

  li.appendChild(label);
  li.appendChild(checkbox);

  filter_list.appendChild(li);
});

// 검색 버튼 이벤트 핸들러
async function handleSearch(event) {
  event.preventDefault();

  // 기존 리스트 삭제
  Array.from(mask_list.children).forEach((item) => item.remove());

  // 선택된 필터링 조회
  const address = search_text.value;
  const filter = document.querySelectorAll('input[name="filter"]:checked');
  const filtering = Array.from(filter).map(function (checked) {
    return checked.value;
  });

  // 데이터 가져오기
  const datas = await getDatas(address, filtering);

  // 리스트 렌더링
  datas.forEach(function (data) {
    mask_list.appendChild(renderItem(data));
  });
}

// 리스트 아이템 생성
function renderItem(data) {
  const li = document.createElement("li");
  const a_remain_stat = document.createElement("a");
  const a_name = document.createElement("a");
  const a_addr = document.createElement("a");

  a_remain_stat.className = "mask-remain_stat";
  a_name.className = "mask-name";
  a_addr.className = "mask-addr";

  const remain_data = remain_stats[data.remain_stat];
  a_remain_stat.appendChild(document.createTextNode(remain_data.label));
  a_remain_stat.classList.add(data.remain_stat);
  a_name.appendChild(document.createTextNode(data.name));
  a_addr.appendChild(document.createTextNode(data.addr));

  li.className = `mask-item mask-${data.remain_stat}`;

  li.appendChild(a_remain_stat);
  li.appendChild(a_name);
  li.appendChild(a_addr);

  return li;
}

// API에 데이터 요청하기
function getDatas(address, filtering) {
  const server_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1";
  const api_uri = "/storesByAddr/json";

  const data = axios({
    method: "GET",
    url: server_url + api_uri,
    params: {
      address: address,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      const stores = result.data.stores;

      // 필터링 조건에 일치하는 데이터 추출
      const filtered = !!filtering
        ? stores.filter(function (info) {
            return filtering.indexOf(info.remain_stat) !== -1;
          })
        : stores;

      // 데이터 정렬
      const sorted = filtered.sort(function (a, b) {
        const a_index = remain_stats[a.remain_stat].index;
        const b_index = remain_stats[b.remain_stat].index;

        return a_index > b_index ? 1 : -1;
      });

      return sorted;
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });

  return data;
}
