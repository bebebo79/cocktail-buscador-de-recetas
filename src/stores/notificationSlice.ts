import {StateCreator} from 'zustand'
import Notification from '../components/Notification'
import { FavoritesSlineType } from './favoritesSlice'

type Notification = {
    text : string,
    error : boolean,
    show :boolean
}



export type notificationSlineType = {
    notification : Notification,
    showNotification : (payload: Pick<Notification, 'text' | 'error'>) => void,
    hidenNotificationModal: () => void
   
}



export const createNotificationSline : StateCreator<notificationSlineType & FavoritesSlineType,[],[],notificationSlineType> = (set, get)=>({
      notification : {
        text : '',
        error : false,
        show : false

      },
      showNotification : (payload)=> {
        set({
          notification : {
            text: payload.text,
            error: payload.error,
            show : true
          } 
        })
        setTimeout(() => {
          get().hidenNotificationModal()
        }, 5000);
      },
      hidenNotificationModal : () =>{
        set({
          notification : {
            text : '',
            error : false,
            show : false
    
          }

        })
      }
})