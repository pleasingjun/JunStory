<template>
  <div class="pages">
    <div class="contentBox" :style="isShowRes?leftStyle:''">
      <div :style="isShowRes?`transform: scale(1.2);`:''"> {{ leftMBTI.type.name }}</div>
      <p :style="isShowRes?`transform: scale(1);height:auto}`:''">{{ leftMBTI.type.nameCN }}</p>
    </div>
    <div class="contentBox" :style="isShowRes?rightStyle:''">
      <div :style="isShowRes?`transform: scale(1.2);`:''"> {{ rightMBTI.type.name }}</div>
      <p :style="isShowRes?`transform: scale(1);height:auto}`:''">{{ rightMBTI.type.nameCN }}</p>
    </div>

    <span class="startBtn">
        <a-button
            @click="startDrawing()"
            size="large"
            shape="round"
            :disabled="!isClick"
        >START !</a-button>
    </span>
  </div>
</template>
<script setup>
import {reactive, ref, watch} from "vue";

const isShowRes = ref(false);
const isClick = ref(true)
const leftMBTI = reactive({
  type: {
    name: "MBTI",
    nameCN: "",
    textColor: "",
    bgColor: ""
  }
});
const rightMBTI = reactive({
  type: {
    name: "MBTI",
    nameCN: "",
    textColor: "",
    bgColor: ""
  }
});
const leftStyle = ref(`background: ${leftMBTI.type.bgColor};color:${leftMBTI.type.textColor};`)
const rightStyle = ref(`background: ${rightMBTI.type.bgColor};color:${rightMBTI.type.textColor}`)


watch(leftMBTI, () => {
  leftStyle.value = `background: ${leftMBTI.type.bgColor};color:${leftMBTI.type.textColor}`
})

watch(rightMBTI, () => {
  rightStyle.value = `background: ${rightMBTI.type.bgColor};color:${rightMBTI.type.textColor}`
})

const Earr = reactive({
  list: [
    {
      name: 'ENTJ',
      nameCN: "指挥官",
      textColor: "#f1f66c",
      bgColor: "#bd4be8"
    },
    {
      name: 'ENTP',
      nameCN: "辩论家",
      textColor: "#ff5252",
      bgColor: "#ad2dd3"
    },
    {
      name: 'ENFJ',
      nameCN: "主人公",
      textColor: "#333",
      bgColor: "#efff00"
    },
    {
      name: 'ENFP',
      nameCN: "竞选者",
      textColor: "#ffaf75",
      bgColor: "#7f648c"
    },
    {
      name: 'ESTJ',
      nameCN: "总经理",
      textColor: "#000000",
      bgColor: "#ffffff"
    },
    {
      name: 'ESFJ',
      nameCN: "执政官",
      textColor: "#000709",
      bgColor: "#ff6464"
    },
    {
      name: 'ESFP',
      nameCN: "表演者",
      textColor: "#ffb614",
      bgColor: "#9e25bb"
    },
    {
      name: 'ESTP',
      nameCN: "企业家",
      textColor: "#6b6cf8",
      bgColor: "#daff4b"
    },
  ]
})
const Iarr = reactive({
  list: [
    {
      name: 'INTJ',
      nameCN: "建筑师",
      textColor: "#3cff6b",
      bgColor: "#1d383f"
    },
    {
      name: 'INTP',
      nameCN: "逻辑学家",
      textColor: "#000000",
      bgColor: "#6363ee"
    },
    {
      name: 'INFJ',
      nameCN: "提倡者",
      textColor: "#ceff9b",
      bgColor: "#3d4624"
    },
    {
      name: 'INFP',
      nameCN: "调停者",
      textColor: "#ff0e43",
      bgColor: "#6de7b6"
    },
    {
      name: 'ISTJ',
      nameCN: "物流师",
      textColor: "#b772ff",
      bgColor: "#293d42"
    },
    {
      name: 'ISFJ',
      nameCN: "守卫者",
      textColor: "#1f59a1",
      bgColor: "#77dfe3"
    },
    {
      name: 'ISTP',
      nameCN: "鉴赏家",
      textColor: "#856300",
      bgColor: "#f9eed7"
    },
    {
      name: 'ISFP',
      nameCN: "探险家",
      textColor: "#ffd6d6",
      bgColor: "#3d2e0b"
    },
  ]
})
const getRandomMBTI = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
const startDrawing = () => {
  isClick.value = false
  let speed = 10; // 初始抽签速度，100毫秒
  let counter = 0;

  const drawWithDelay = () => {
    isShowRes.value = false;
    if (counter < 35) { // 共35次抽签，3.5秒
      // leftMBTI.value = "E" + getRandomMBTI().substring(1);
      // rightMBTI.value = "I" + getRandomMBTI().substring(1);
      leftMBTI.type = getRandomMBTI(Earr.list)
      rightMBTI.type = getRandomMBTI(Iarr.list)

      counter++;
      speed += 5; // 每次抽签增加20毫秒延迟
      setTimeout(drawWithDelay, speed);
    } else {
      isShowRes.value = true;
      isClick.value = true
    }
  };
// 开始抽签
  drawWithDelay()
  console.log(leftStyle);
}

</script>

<style scoped lang="scss">
.pages {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
}

.contentBox {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background: #eee;
  height: 100vh;
  width: 50%;

  transition: all .1s;

  div {
    font-weight: 600;
    font-size: 10vw;
    transition: all .1s;
  }

  p {
    font-size: 5vw;
    transform: scale(0);
    transition: all .1s;
    height: 0;
  }
}

.startBtn {
  position: fixed;
  bottom: 15vh;
  transition: all .3s;

  &:hover {
    transform: scale(1.2);
  }
}
</style>