<template>
    <div class="editorSecWarp">
        <div id="toolbar2" class="toolbar"></div>

		<div id="innerText2" class="innerText"></div>

    </div>
</template>

<script>
    import E from 'wangeditor'
    import {getToken} from "../../utils/auth.js"
    import global from "../../Global.js";
    export default {
        name:'EditorSec',
        props:['description','appendContent','newsid'],
        data(){
            return {
                editor2:Object,
                editorContent: '',
                //baseUrl:'http://newsmanagerapi.tech.jojojr.cn/api/',
                addPicUrl:'/news/NewsImageUpload?newsId=',
            }
        },
        watch:{
            description:function(val){
                this.editor2.txt.html(val);
                this.editorContent = val;
            }
        },
        methods:{
            getContent: function () {
                return this.editorContent;
            },
            clearContent: function () {
                this.editor2.txt.html('');
                this.editorContent = '';
            },
            cleanContent(){
                this.editor2.txt.clear();
                this.editorContent = '';
            },
            sendContent:function(){
                this.$emit('sendCont',this.editorContent)
            },
            appendcontent(sth){//添加内容
                this.editor2.txt.html(sth)

            },
            getedtor(){
              document.getElementById("toolbar").innerHTML = ""
              document.getElementById("innerText").innerHTML = ""
                this.editor2 = new E('#toolbar2','#innerText2')
                this.editor2.customConfig.onchange = (text) => {
                    this.editorContent = text;
                this.sendContent();
                }
                var url = global.commonapi + this.addPicUrl + this.newsid + '&imageId= ';
                this.editor2.customConfig.uploadImgServer = url;//设置上传地址
                this.editor2.customConfig.uploadImgMaxLength = 1;//限制每次上传图片数量
                this.editor2.customConfig.uploadFileName = 'HttpPostedFile';
                this.editor2.customConfig.uploadImgHeaders = {
                    'Authorization': 'Bearer ' + getToken()
                };
                var that = this;
                this.editor2.customConfig.uploadImgHooks = {//控制上传钩子函数
                    before: function (xhr, editor, files) {

                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                    },
                    // success: function (xhr, editor, result) {
                    //     // 图片上传并返回结果，图片插入成功之后触发
                    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    // },
                    fail: function (xhr, editor, result) {
                        that.$message(result.Message);
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, editor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                        that.$message("上传出错");
                    },
                    timeout: function (xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, editor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        var url = result.Data.imageUrl;
                        insertImg(url)

                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }

                }

                this.editor2.create();






            }

        }
    }
</script>

<style lang="less">
.editorSecWarp{
    .toolbar2{
	border-bottom: 1px solid #ccc;
	width: 904px;
    }
    .innerText2{
        height: 310px;
        width: 904px;
        overflow-y: auto;
    }
}

</style>


