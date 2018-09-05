<template>
    <div>
        <div id="editorElem" style="text-align:left"></div>
        <!-- <button v-on:click="getContent">查看内容</button> -->
    </div>
</template>

<script>
    import E from 'wangeditor'
    // import EventBus from '@/filters/Eventbus'

    export default {
      name: 'editor',
      props:['description'],
      data () {
        return {
          editor:Object,
          // description:'',
          editorContent: ''
        }
      },
      watch:{
        description:function(val){
          this.editor.txt.html(val);
          this.editorContent = val;
        }
      },
      methods: {
        getContent: function () {
            // alert(this.editorContent)
            return this.editorContent;
        },
        clearContent: function () {
          this.editor.txt.html('');
          this.editorContent = '';
        },
      }, 
      mounted() {
        this.editor = new E('#editorElem')
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
		//this.editor.customConfig.uploadImgServer = this.GLOBAL.apiAddress+'Article/AddArticleFileInfo';
    	this.editor.customConfig.uploadFileName = 'HttpPostedFile';
    	this.editor.customConfig.uploadImgHeaders = {
    		'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
    	var that = this;
   		this.editor.customConfig.uploadImgHooks = {
		    before: function (xhr, editor, files) {
		    	
		        // 图片上传之前触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
		        
		        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
		        // return {
		        //     prevent: true,
		        //     msg: '放弃上传'
		        // }
		    },
		    success: function (xhr, editor, result) {
		        // 图片上传并返回结果，图片插入成功之后触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
		    },
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
		        var url = result.Data;
		        insertImg(url)
		
		        // result 必须是一个 JSON 格式字符串！！！否则报错
		    }
		    
		}
        this.editor.create()
      }
    }
</script>

<style scoped>

</style>