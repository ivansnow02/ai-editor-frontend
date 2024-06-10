import { defineStore } from "pinia";
export const useStore = defineStore('store', {
    state: () => {
        return {
            storeContent: "",
            responseStoreContent: "",
        }
    },
    getters:{ 
       
    },
    actions:{
        getContent(){
            return this.storeContent;
        },
        getResponseContent() {
            return this.responseStoreContent;
        },
        upDateResponseContent(val: string){
            this.responseStoreContent = val;
        },
        upDateContent(val: string){
            this.storeContent = val;
            
        }
    }
})