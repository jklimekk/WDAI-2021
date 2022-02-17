import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { User } from "../types/user";

@Injectable()
export class UserService{
    users: AngularFirestoreCollection<any>;    
    userID: string = "";

    constructor(private db: AngularFirestore) {
        this.users = db.collection('users');
    }

    getUser(uid: any): Observable<User> {
        this.userID = uid;
        return this.users.doc(uid).valueChanges();
    }

    getAllUsers() {
        return this.users;
    }

    addUSer(uid: string, mail: string) {
        this.users.doc(uid).set({ key: uid,
                                    mail: mail,
                                    banned: false,
                                    admin: false,
                                    manager: false,
        });    
    }
    
    ban(user: User) {
        this.users.doc(user.key).update({ banned: true });
    }

    unban(user: User) {
        this.users.doc(user.key).update({ banned: false });
    }

    makeAdmin(user: User) {
        this.users.doc(user.key).update({ admin: true })
    }

    unmakeAdmin(user: User) {
        this.users.doc(user.key).update({ admin: false })
    }

    makeManager(user: User) {
        this.users.doc(user.key).update({ manager: true })
    }

    unmakeManager(user: User) {
        this.users.doc(user.key).update({ manager: false })
    }

}