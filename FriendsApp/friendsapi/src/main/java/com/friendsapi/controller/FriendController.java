package com.friendsapi.controller;

import com.friendsapi.model.Friend;
import com.friendsapi.service.FriendService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FriendController {

    private FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @GetMapping("/friends")
    public List<Friend> getFriends(){
        return friendService.getFriends();
    }

    @PostMapping("/friends/addnew")
    public void addFriend(@RequestBody Friend friend){
        friendService.addFriend(friend);
    }

    @PutMapping("/friends/{id}/edit")
    public void updateFriend(@RequestBody Friend friend, @PathVariable("id") Integer id){
        friendService.updateFriend(friend);
    }

    @DeleteMapping("/friends/{id}/delete")
    public void deleteFriend(@PathVariable("id") Integer id){
        friendService.deleteFriend(id);
    }
}
