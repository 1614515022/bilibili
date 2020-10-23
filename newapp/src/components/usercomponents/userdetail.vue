<template>
  <div class="userdetail">
        <div>
            <div class="user_img">
                <img v-if="userinfo.user_img" :src="userinfo.user_img">
                <img src="@/assets/me.jpg" v-else>
            </div>
            <div class="user_data">
                <div>
                    <p>
                        <span>2</span>
                        <span class="user_text">粉丝</span>
                    </p>
                    <p>
                        <span>54</span>
                        <span class="user_text">关注</span>
                    </p>
                    <p>
                        <span>30</span>
                        <span class="user_text">获赞</span>
                    </p>
                </div>
                <div @click="$router.push('/edit')">
                    <div class="user_dataBtn">编辑资料</div>
                </div>
            </div>
        </div>
        <div>
            <h2>{{userinfo.name}}</h2>
            <p v-if="userinfo.user_desc">{{userinfo.user_desc}}</p>
            <p v-else>这个人很懒，什么都没有留下</p>
        </div>
  </div>
</template>

<script>
export default {
    props:["userinfo"],
    
}

</script>
<style lang='less' scoped>
.userdetail{
    background-color:white;
    padding:0 3.333vw;
    
    >div:nth-child(1){
        display: flex;
        .user_img{
            margin-right:5.556vw;
            img{
                width:22.222vw;
                height: 22.222vw;
                border-radius: 11.111vw;
            }
           
        }
        .user_data{
            flex:1;
            div:nth-child(1){
                display:flex;
                p{
                    flex:1;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-size:3.611vw;
                    .user_text{
                        color:#aaa;
                        
                    }
                }
                p:nth-child(1){
                    border-right:0.278vw solid #ccc;
                }
                p:nth-child(2){
                    border-right:0.278vw solid #ccc;
                }
            }
        }
        div:nth-child(2){
            padding:1.389vw 2.778vw;
            .user_dataBtn{
                border:0.278vw #fb7a9f solid;
                color:#fb7a9f;
                display:flex;
                justify-content:center;
                align-items:center;
                border-radius: 2.778vw;
            }
        }
    }
    >div:nth-child(2){
        h2{
            margin:5px 0 3px 0;
        }
        p{
            margin: 10px 0;
            padding:0;
        }
    }
}
</style>