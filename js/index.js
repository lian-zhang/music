$(document).ready(function(){
	    var audio=$('#audio').get(0);
	    //播放暂停
		var bo=$('.yuan1');
		bo.on('click',function(){
			if(audio.paused){
				audio.play();
			    $(this).html('<i class="icon">&#xe617;</i>');
			    $(".tu1").addClass("move")
			     $(".tu2").addClass("move")
			      $(".tu3").addClass("move")
			}else{
				audio.pause()
			    $(this).html('<i class="icon">&#xe605;</i>');
			    $(".tu1").removeClass("move")
			     $(".tu2").removeClass("move")
			      $(".tu3").removeClass("move")
			}			
		})
		//时间
		var box=$('.tiao2');
		var width=box.width();
		var circle1=$('.circle');
		$('#audio').on('timeupdate',function(){
			var qitime=$('.start');
			var zongtime=$('.end');
			qitime.html(format(audio.currentTime));
			zongtime.html(format(audio.duration));
//			$(".tu1").addClass("move")
//			     $(".tu2").addClass("move")
//			      $(".tu3").addClass("move")
			//播放进度条随时间变化			
			circle1.on("click",false);//阻止circle1冒泡事件					  		    
		    var left=audio.currentTime/audio.duration*width-circle1.width()/2;	    
		    circle1.css('left',left);
		})
		//获取已播放的长度
		box.on("click",function(e){
			 audio.currentTime=e.offsetX/width*audio.duration;
		})
		//进度条拖拽		
		circle1.on("touchstart",function(e){
//			e.preventDefault();//阻止默认事件
			var r=circle1.width()/2;			
            var offsetX=e.originalEvent.changedTouches[0].clientX-circle1.offset().left;
            var start=r-offsetX;
			$(document).on("touchmove",function(e){
				console.log(1)
				var clientX=e.originalEvent.changedTouches[0].clientX			
				var left1=clientX-box.offset().left+start;
				var c1=left1/width*audio.duration;
				console.log(clientX,left1)
				if(c1>=audio.duration||c1<=0){
					return;
				}
				audio.currentTime=c1				
			})
			return false;
		})
		$(document).on("touchend",function(){
			$(document).off("touchmove");
		})
		//时间换算
		function format(v){
			v=Math.floor(v);
			var s=v%60;
			s=(s<10)? ('0'+s):s;
			m=Math.floor(v/60);
		    return m+":"+s
		}
		$('#audio').on('canpaly', function() {
		zongtime.html(format(audio.duration));
	    })
		//音量调节
        var yin=$('.vtiao');
        var circle2=$('.vcircle');
        circle2.on('click',false);
        yin.on('click',function(e){
        	audio.volume = e.offsetX / yin.width();
        	jinyin.removeAttr('weizhi');
//      	circle2.style.left=e.offsetX-circle2.offsetWidth/2+"px"
        })
        //静音
        var jinyin=$('.jin');
        jinyin.on('click',function(e){
        	if($(this).attr('weizhi')){       		
        		audio.volume =$(this).attr('weizhi');
        		$(this).removeAttr('weizhi');
//      		circle2.style.left=e.offsetX-circle2.offsetWidth/2+"px"
        		
        	}else{
        		$(this).attr('weizhi',audio.volume);
        	    audio.volume=0;
//      	    circle2.style.left="0px";
        	}
        	
        });
        //音量拖拽
        circle2.on("touchstart",function(e){ 
        	
        	var r2=circle2.width()/2;
        	var offsetX2=e.originalEvent.changedTouches[0].clientX-circle2.offset().left;
        	var start2=r2-offsetX2;
        	$(document).on("touchmove",function(e){
        		
        		var left2=e.originalEvent.changedTouches[0].clientX-yin.offset().left+start2;
        		var c2=left2/yin.width()
        		if(c2>1||c2<0){
        			return;
        		}
        		audio.volume = c2
        		console.log(left2)
        		return false;

        	})        	
        })
        $(document).on("touchend",function(){
        		$(document).off("touchmove");        		
        })
        //音量驱动事件
        $("#audio").on('volumechange',function(){
        	circle2.css("left",yin.width()*audio.volume-circle2.width()/2)
        });
        //新增歌曲
        var currentIndex=0;
        var ul=$(".ul");
        var musics=[{
		src:"e.mp3",
		name:"去大理",
		author:"黄渤"
		},{
			src:"她说.mp3",
			name:"她说",
			author:"林俊杰"
		},{
			src:"第一次.mp3",
			name:"第一次",
			author:"光良"
		}]
        
//		localStorage.musics=JSON.stringify(musics)
//		render(musics)
//	
//		ul.on("click","li",function(){
//			 index=$(this).index();
//			 render(musics);
//		})
//		
//		
//		function render(obj){
//			ul.empty();
//			for(var i=0;i<obj.length;i++){
//				if(i==index){
//					audio.src=obj[i].src;
//					audio.play()
//					console.log(obj[i].src)
//					c="color"
//				}else{
//					c=""
//				}
////				$("<li><span class='name "+c+"'>"+obj[i].name+"</span><span class='author "+c+"'>-"+obj[i].author+'</span></li>").
////				appendTo(ul)
//				$("<li class='"+c+"'><span>"+obj[i].name+"</span><span>-"+obj[i].author+"</span><i class='icon i5'>&#xe606;</i><i class='icon i6'>&#xe662;</i></li>").appendTo(ul);
//			}
//		}
//		var but=$(".but");		
//		var index;
//		//切歌
//		but.eq(0).click(function(){
//			if(index==undefined){
//				index=musics.length-1;
//			}
//			else{
//				index--
//				if(index<0){
//				index=musics.length-1;
//			}
//			}
//			
//			render(musics)
//		})
//		
//		but.eq(1).click(function(){
//			if(index==undefined){
//				index=0;
//			}
//			else{
//				index++
//				if(index>=musics.length){
//				index=0;
//			}
//			}
//			
//			render(musics)
//		})
//事件		
        $('#audio').on('loadstart',function(){
//      	$(".tu1").addClass("move")
//			     $(".tu2").addClass("move")
//			      $(".tu3").addClass("move")
        });//当歌曲刚加载时调用fn
//      $('#audio').on('canplay',function(){
//      	
//      });//当歌曲下载完之后调用fn
//		$('#audio').on('volumechange',function(){
//      	
//      });//当audio.volume发生变换的时候调用fn	
//      $('#audio').on('play',function(){
//      	
//      });//歌曲开始播放之后调用fn
//      $('#audio').on('pause',function(){
//      	
//      });//歌曲暂停之后调用fn
//		$('#audio').on('timeupdate',function(){
//      	
//      });//歌曲在播放的过程中会一直调用fn	
		$('#audio').on('ended',function(){
        	$(".tu1").removeClass("move")
			     $(".tu2").removeClass("move")
			      $(".tu3").removeClass("move")
        });//一首歌曲播放完之后调用fn

 //定义函数
    function render(){
    	ul.empty();
    	$.each(musics,function(index,val){
    		var c=(index==currentIndex) ? "active":"";
    		console.log(c)
    			$("<li class='"+c+"'><span>"+musics[index].name+"</span><span>-"+musics[index].author+"</span><i class='icon i5'>&#xe606;</i><i class='icon i6'>&#xe662;</i></li>").appendTo(ul);
    	})
    }  
    render();
// 下一首
   var next=$(".yuan31");
   function nextf(){
   		currentIndex++;
   		if (currentIndex>musics.length-1) {
   			currentIndex=0;
   		}
   		audio.src=musics[currentIndex].src;
   		$(".title").html(musics[currentIndex].name);
   		$(".name").html(musics[currentIndex].author);
   		render();
   }
// 上一首
    var pre=$(".yuan21");
    function prev(){
   		currentIndex--;
   		if (currentIndex<0) {
   			currentIndex=musics.length-1;
   		}
   		audio.src=musics[currentIndex].src;
   		$(".title").html(musics[currentIndex].name);
   		$(".name").html(musics[currentIndex].author);
   		render();
    }
//上一首下一首添加事件
    pre.on("touchend",prev);
    next.on("touchend",nextf);
//列表删除 一定不要冒泡
	ul.on("touchend",".i5",function(){
		var aa=$(this).closest("li");
		var index=aa.index();
		musics.splice(index,1);
		if(index==currentIndex){
			if(musics[currentIndex]){
				audio.src=musics[currentIndex].src;
			}
			else{
				audio.src="";
				if(currentIndex==musics.length-1){
					currentIndex=0;
				}
//				currentIndex=0;
//				musics[currentIndex].src
			}
		}
		else if(index>currentIndex){
				
			}
		else if(index<currentIndex){
			currentIndex-=1;
		}
		render();
		return false;
	})
//点击哪首播放哪首
	ul.on("touchend","li",function(){
    	$("li").removeClass("active");
    	$(this).addClass("active");
    	currentIndex=$(this).index();
    	console.log(currentIndex);
    	audio.src=musics[currentIndex].src;
    	$(".title").html(musics[currentIndex].name);
    	$(".name").html(musics[currentIndex].author);
    	render();
    })
//点song 出现列表
$(".songs").on("touchend",function(){
	$(".box3").css("display","block");
	$(".box1").css("display","none");
})
//点close 关闭列表
$(".close").on("touchend",function(){
	$(".box3").css("display","none");
	$(".box1").css("display","block");
})
//新增歌曲
	$(".i3").on("touchend",function(){
		var a=$(this).attr("data-v");
		musics.push(JSON.parse(a));
		render();
	})
	render();
//清空列表
$(".i2").on("touchend",function(){
	console.log(1)
		musics=[]
		localStorage.musics=JSON.stringify(musics)
		render();
		return false;
	})
//audio函数
	$(audio).on("canplay",function(){
		$(".ul li").removeClass("active");
		$(".ul li").eq(currentIndex).addClass("active");
		audio.play();
	})
	$(audio).on("ended",function(){
		nextf();
		$(".tu1").removeClass("move")
			     $(".tu2").removeClass("move")
			      $(".tu3").removeClass("move")
	})
	$(audio).on("loadstart",function(){
		
	})

});