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
        upDateResponseContent(val: string){
            this.responseStoreContent = val;
        },
        upDateContent(val: string){
            this.storeContent = val;
            
        }
    }
})