/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}
*/

let app=new Vue({
    el:'#app',
    data:{
        flag_enter:false,
    },
    methods:{
        dragEnter(){
            this.flag_enter=true;
        },

        dragLeave(){
            this.flag_enter=false;
            this.flag_over=false;
        },

        dropFile(){
            this.flag_enter=false;
            this.flag_over=false;
            var file_list = event.dataTransfer.files;
            var img_list=[];
            Object.keys(file_list).forEach(function(key){
                if(!file_list[key]['type'].match('image.*'))return;
                img_list.push(file_list[key]);
            });
            [].forEach.call(img_list,this.preview);
        },

        selectFile(){
            this.$refs.selectFile.click();
        },

        inputFile(e){
            var img_list=e.target.files;
            [].forEach.call(img_list,this.preview);
        },

        preview(img){
            let reader = new FileReader();   
            let image=new Image();

            reader.addEventListener("load",function(){
                image.onload=function(){
                    app.drawCanvas(image);
                }
                image.src=this.result;
            },false);
            reader.readAsDataURL(img);
        
        },

        drawCanvas(img){
            let canvas=document.createElement('canvas');
            let ctx=canvas.getContext('2d');
            let grid=document.createElement('div');

            canvas.width=img.width;
            canvas.height=img.height;
            ctx.drawImage(img,0,0);
            ctx=this.writeCopyright(ctx);
            grid.className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 flex items-center justify-center';
            let image=new Image();

            image.src=canvas.toDataURL();
            image.className='p-1 w-1/2 sm:w-full md:w-full lg:w-full xl:w-full';
            grid.appendChild(image);
            previewArea.appendChild(grid);
        },

        writeCopyright(img){
            w=img.canvas.width;
			h=img.canvas.height;
			let size=Math.floor(w*3/160);
            img.font = "bold "+size+"px 'Open Sans'";
            img.textAlign = 'right';
            img.fillStyle="#00518f";
            img.strokeStyle = '#ffffff';
            img.lineWidth=10;
			img.strokeText('©Liber Entertainment Inc.', w-5, h-5,w/3);
            img.fillText('©Liber Entertainment Inc.', w-5, h-5,w/3);
            return img;
        }
    }
})