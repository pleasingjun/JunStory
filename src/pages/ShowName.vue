<template>
  <div class="pages">
    <div class="contentBox" :style="isShowRes?leftStyle:''">
      <div :style="isShowRes?`transform: scale(1.2);`:''"> {{ showName.type.name }}</div>
    </div>


    <span class="startBtn">
        <a-button
            @click="startDrawing()"
            size="large"
            shape="round"
            :disabled="!isClick"
        >START !</a-button>

              <a-button
                  @click="isShowSetting = true"
                  size="large"
                  shape="circle"
                  :disabled="!isClick"
                  style="margin-left: 30px"
              >
               <template #icon>
               <SettingOutlined></SettingOutlined>
               </template>
              </a-button>
    </span>

    <a-modal
        title="来填写抽签内容吧(竖屏更佳)"
        width="90%"
        v-model:open="isShowSetting"
        :footer="null"
        style="top: 5vh"
    >

      <a-form
          ref="formRef"
          name="dynamic_form_item"
          :model="dynamicValidateForm"
          v-bind="formItemLayoutWithOutLabel"
      >
        <div
            style="height: 55vh;overflow: scroll"
        >

          <a-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              v-bind="index === 0 ? formItemLayout : {}"
              :label="index === 0 ? '勾选代表参加抽签' : ''"
              :name="['domains', index, 'name']"
              :rules="{
        required: true,
        message: '请填写内容',
        trigger: 'change',
      }"
          >
            <a-checkbox v-model:checked="domain.remember"></a-checkbox>
            <a-input
                v-model:value="domain.name"
                placeholder="请在这里输入"
                style="width: 70%; margin: 0 10px"
            />
            <MinusCircleOutlined
                v-if="dynamicValidateForm.domains.length > 1"
                class="dynamic-delete-button"
                @click="removeDomain(domain)"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 90%" @click="addDomain">
              <PlusOutlined/>
              继续添加
            </a-button>
          </a-form-item>
        </div>
        <p style="text-align: center">注：填写的内容将保存到本地 下一次打开可继续抽签</p>
        <a-form-item v-bind="formItemLayoutWithOutLabel" style="text-align: center">
          <a-button type="primary" html-type="submit" @click="submitForm">
            <template #icon>
              <CheckOutlined />
            </template>
            填写完成</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">
            <template #icon>
              <CloseCircleOutlined />
            </template>
            清空内容</a-button>
        </a-form-item>
      </a-form>
    </a-modal>


  </div>
</template>
<script setup>
import {reactive, ref, watch} from "vue";
import {ExclamationCircleOutlined,CheckOutlined,CloseCircleOutlined,MinusCircleOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons-vue'
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';


const saveList = JSON.parse(localStorage.getItem('nameList'))
const nameArr = reactive({list: []})
const dynamicValidateForm = reactive({
  domains: [],
});
console.log(nameArr);
if(saveList){
  dynamicValidateForm.domains=saveList
nameArr.list = saveList.filter(item =>item.remember)
}


// 设置
const isShowSetting = ref(false)
// 表单
const formRef = ref();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const submitForm = () => {
  formRef.value
      .validate()
      .then(() => {
        console.log('values', dynamicValidateForm.domains);
        nameArr.list = dynamicValidateForm.domains.filter(item=>item.remember)
        localStorage.setItem('nameList', JSON.stringify(nameArr.list))
        isShowSetting.value =false
      })
      .catch(error => {
        console.log('error', error);
      });
};
const resetForm = () => {
  Modal.confirm({
    title: '确认全部清空吗?',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
          formRef.value.resetFields()
      localStorage.removeItem('nameList')
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};
const removeDomain = item => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};
const addDomain = () => {
  const random = Math.floor(Math.random() * Earr.list.length)
  dynamicValidateForm.domains.push({
    remember:true,
    name: '',
    key: Date.now(),
    textColor: Earr.list[random].textColor,
    bgColor: Earr.list[random].bgColor
  });
};


const isShowRes = ref(false);
const isClick = ref(true)
const showName = reactive({
  type: {
    name: "来抽签吧(横屏更佳)",
    nameCN: "",
    textColor: "",
    bgColor: ""
  }
});

const leftStyle = ref(`background: ${showName.type.bgColor};color:${showName.type.textColor};`)

watch(showName, () => {
  leftStyle.value = `background: ${showName.type.bgColor};color:${showName.type.textColor}`
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
      showName.type = getRandomMBTI(nameArr.list)
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
  //width: 50%;

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
  bottom: 10vh;
  right: 10vh;
  transition: all .3s;

  &:hover {
    transform: scale(1.2);
  }
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>