<template>
	<div class="emergency-wrap">
		<div class="emergency-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>应急电话</span>					
		</div>
		<div class="emergency-wrap-contaire">
			<div class="emergency-wrap-title">
				<h3>常用电话</h3>
				<ul>
					<li @click="callphone('122')">
						<img src="../../assets/img/shouye/122.png" alt="" />
						<span>事故</span>
						<b>122</b>				
					</li>
					<li @click="callphone('120')">
						<img src="../../assets/img/shouye/120.png" alt="" />
						<span>急救</span>
						<b>120</b>				
					</li>
					<li @click="callphone('110')">
						<img src="../../assets/img/shouye/110.png" alt="" />
						<span>匪警</span>
						<b>110</b>				
					</li>
					<li @click="callphone('119')">
						<img src="../../assets/img/shouye/119.png" alt="" />
						<span>火警</span>
						<b>119</b>				
					</li>
				</ul>
			</div>
			<div class="emergency-wrap-jiuyuan">
				<h3>道路救援</h3>
				<ul>
					<li>
						<p><span>中联车盟道路救援</span><span>400-810-8208</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('400-810-8208')"/>
					</li>
					<li>
						<p><span>中石化免费救援</span><span>95105988转7</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('95105988')"/>
					</li>
					<li>
						<p><span>太平洋车险免费救援</span><span>95500转3转3</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('95500')"/>
					</li>
					<li>
						<p><span>人保车险免费救援</span><span>95518转9</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('95518')"/>
					</li>
					<li>
						<p><span>平安车险免费救援</span><span>95511转5转2</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('95511')"/>
					</li>
					<li>
						<p><span>大陆汽车救援</span><span>400-818-1010</span></p>
						<img src='../../assets/img/shouye/caozuophone.png' @click="callphone('400-818-1010')"/>
					</li>
				</ul>
			</div>
			<div class="emergency-wrap-baoxian">
				<h3>保险公司电话</h3>
				<ul>
					<li>
						<img src="../../assets/img/shouye/ab.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>安邦汽车保险</span><span>95569</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95569')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/rscx.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>中国人寿财险</span><span>95519</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95519')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/ac.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>安成汽车保险</span><span>4000500000</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('4000500000')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/huaan.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>华安汽车保险</span><span>95556</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95556')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/minan.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>民安汽车保险</span><span>95506</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95506')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/tianping.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>天平汽车保险</span><span>95550</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95550')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/dazhong.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>大众汽车保险</span><span>95507</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95507')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/bohai.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>渤海汽车保险</span><span>4006116666</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('4006116666')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/huatai.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>华泰汽车保险</span><span>4006095509</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('4006095509')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/yongcheng.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>永诚汽车保险</span><span>95552</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95552')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/dubang.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>都邦汽车保险</span><span>95586</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95586')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/taiping.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>太平汽车保险</span><span>95589</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95589')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/yangguang.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>阳光汽车保险</span><span>95510</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95510')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/tianan.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>天安汽车保险</span><span>95505</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95505')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/yongan.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>永安汽车保险</span><span>95502</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95502')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/dadi.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>大地汽车保险</span><span>95590</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95590')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/zhlh.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>中华联合汽车保险</span><span>95585</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95585')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/taipingyang.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>太平洋汽车保险</span><span>95500</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95500')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/zgrb.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>中国人保汽车保险</span><span>95518</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95518')"/>
					</li>
					<li>
						<img src="../../assets/img/shouye/zgpa.png" style="width:1.2rem;height:1.2rem;"/>
						<p><span>平安汽车保险</span><span>95512</span></p>
						<img src="../../assets/img/shouye/caozuophone.png" style="width:0.56rem;height:0.66rem;" @click="callphone('95512')"/>
					</li>
				</ul>
			</div>	
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default{
	methods:{
		callphone(phonenum){
			MessageBox.confirm('', {
		        message: '确定拨打电话？',
		        showConfirmButton:true,
		        showCancelButton:true,
		        confirmButtonText:'确定',
		        cancelButtonText:'取消'
	        }).then(action => {
	          if (action == 'confirm') {
	            window.device.callPhone(phonenum);
	          }
	        }).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });			
		}
	}
}
</script>

<style scoped>
	.emergency-wrap{
		width:100%;
		height:100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	.emergency-wrap-head{
		height:1.92rem;
		font-size:0.56rem;
		color:#fff;
		width:100%;
		padding:0 0.5rem;
		padding-top:0.6rem;
		text-align: center;
		line-height:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		position: relative;
	}
	.emergency-wrap-head .icon-fanhui{
		position: absolute;
		left:0.5rem;
		font-size:0.6rem;
	}
	.emergency-wrap-contaire{
		flex:1;
		background: #f7f7f7;
		overflow-y: scroll;
	    -webkit-overflow-scrolling: touch;
	}
	.emergency-wrap-title{
		padding:0 0.3rem;
 	}
 	.emergency-wrap-title>h3{
 		font-size:0.48rem;
 		font-weight: 500;
 		color:#666;
 		line-height:1rem;
 		padding-left:0.2rem;
 	}
 	.emergency-wrap-title>ul{
 		display: flex;
 		display: -webkit-flex;
 		justify-content: space-between;
 	}
 	.emergency-wrap-title>ul>li{
 		width:2.8rem;
 		height:2.83rem;
 		background: #fff;
 		border-radius: 5px;
 		padding-top:0.3rem;
 	}
 	.emergency-wrap-title>ul>li>img{
 		width:1.2rem;
 		height:1.2rem;
 		display: block;
 		margin:0 auto;
 	}
 	.emergency-wrap-title>ul>li>span{
 		display: block;
 		font-size:0.38rem;
 		color:#666;
 		text-align: center;
 		line-height:0.7rem;
 	}
 	.emergency-wrap-title>ul>li>b{
 		display: block;
 		font-size:0.48rem;
 		color:#333;
 		font-weight:500;
 		text-align: center;
 		line-height:1;
 	}
 	.emergency-wrap-jiuyuan>h3{
 		font-size:0.48rem;
 		font-weight: 500;
 		color:#666;
 		line-height:1rem;
 		padding-left:0.5rem;
 	}
 	.emergency-wrap-jiuyuan>ul{
 		padding:0 0.3rem;
 		background: #fff;
 	}
 	.emergency-wrap-jiuyuan>ul>li{
 		width:100%;
 		height:1.8rem; 		
 		border-bottom:1px solid #ddd;
 		display: flex;
 		display: -webkit-flex;
 		justify-content: space-between;
 		align-items: center;
 		padding:0.32rem 0.5rem 0.32rem 0.25rem;
 	}
 	.emergency-wrap-jiuyuan>ul>li:last-child{
 		border-bottom:none;
 	}
 	.emergency-wrap-jiuyuan>ul>li>img{
 		width:0.56rem;
 		height:0.66rem;
 	}
 	.emergency-wrap-jiuyuan>ul>li>p{
 		flex: 1;
 		display: -webkit-flex;
 		display: flex;
 		flex-direction: column;
 		justify-content: space-between;
 		height:100%;
 	}
 	.emergency-wrap-jiuyuan>ul>li>p>span:nth-child(1){
 		font-size:0.44rem;
 		color:#333;
 		line-height:1;
 	}
 	.emergency-wrap-jiuyuan>ul>li>p>span:nth-child(2){
 		font-size:0.4rem;
 		color:#666;
 		line-height:1;
 	}
 	.emergency-wrap-baoxian>h3{
 		font-size:0.48rem;
 		font-weight: 500;
 		color:#666;
 		line-height:1rem;
 		padding-left:0.5rem;
 	}
 	.emergency-wrap-baoxian>ul{
 		background: #fff;
 		padding:0 0.3rem;
 	}
 	.emergency-wrap-baoxian>ul>li{
 		width:100%;
 		height:1.8rem;
 		border-bottom:1px solid #ddd;
 		display: flex;
 		display: -webkit-flex;
 		justify-content: space-between;
 		align-items: center;
 		padding:0.3rem 0.5rem 0.3rem 0.25rem;
 	}
 	.emergency-wrap-baoxian>ul>li>p{
 		flex: 1;
 		display: -webkit-flex;
 		display: flex;
 		flex-direction: column;
 		justify-content: space-between;
 		height:100%;
 		margin:0 0.3rem;
 	}
 	.emergency-wrap-baoxian>ul>li>p>span:nth-child(1){
 		font-size:0.44rem;
 		color:#333;
 		line-height:1;
 	}
 	.emergency-wrap-baoxian>ul>li>p>span:nth-child(2){
 		font-size:0.4rem;
 		color:#666;
 		line-height:1;
 	}
 	.emergency-wrap-baoxian>ul>li:last-child{
 		border-bottom:none;
 	}
</style>