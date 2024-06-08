import { defineStore } from "pinia";
export const useStore = defineStore('store', {
    state: () => {
        return {
            storeContent: "",
            responseStoreContent: "",
        }
    },
    getters:{ 
        getContent(){
            return this.storeContent;
        },
        getResponseContent() {
            return this.responseStoreContent;
        },
    },
    actions:{
        upDateContent(val){
            this.responseStoreContent = val;
        },
        getcontent(val){
            this.storeContent = val;
            
        }
    }
})