<template>
    <div class='tinymce-container'>
      <editor id="tinymce" v-model="value" :init="init"></editor>
    </div>
</template>

<script>
  import tinymce from "tinymce";
  import Editor from "@tinymce/tinymce-vue";
  import "tinymce/themes/silver/theme";
  import "tinymce/plugins/image";
  import "tinymce/plugins/link";
  import "tinymce/plugins/code";
  import "tinymce/plugins/table";
  import "tinymce/plugins/lists";
  import "tinymce/plugins/wordcount";
  import 'tinymce/themes/silver'
  import 'tinymce/icons/default'
    export default {
      name: "MyTinymce",
      components: {
        Editor
      },
      props: {
        tinymceHtml: '',
        tinymceHeight: {
          type: Number,
          default: 500
        }
      },
      data() {
        return {
          value: this.tinymceHtml, //父组件通过ref拿到该组件的值
          init: {
            selector: "#tinymce",
            language_url: "/static/tinymce/zh_CN.js",
            language: "zh_CN",
            skin_url: "/static/tinymce/skins/ui/oxide", //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
            height: this.tinymceHeight,
            plugins: "image link code table lists wordcount", //引入插件
            toolbar:
              "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
            browser_spellcheck: true, // 拼写检查
            branding: false, // 去水印
            elementpath: false, //禁用编辑器底部的状态栏
            statusbar: false, // 隐藏编辑器底部的状态栏
            paste_data_images: true, // 允许粘贴图像
            menubar: false, // 隐藏最上方menu

            file_picker_types: 'image',
            images_upload_credentials: true,
            fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
            font_formats:
              "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
            /**
             * 下面方法是为tinymce添加自定义插入图片按钮
             * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
             */
            // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
            images_upload_handler: function(blobInfo, success, failure) {
              console.log(blobInfo, success, failure)
            }
          }
        };
      },
      watch: {
        tinymceHtml(newV,oldV) {
          this.value = newV
        },
        value(newV,oldV) {
          this.value = newV
          this.$emit("changeValue", this.value);
        }
      },
      computed: {},
      created() {},
      mounted() {
        tinymce.init({});
      },
      methods: {}
    }
</script>

<style scoped>

</style>
