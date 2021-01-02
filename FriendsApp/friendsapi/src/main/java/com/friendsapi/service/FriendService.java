package com.friendsapi.service;

import com.friendsapi.model.Friend;
import com.friendsapi.repository.FriendRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendService {

    private FriendRepository friendRepository;

    public FriendService(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    public List<Friend> getFriends() {
        return friendRepository.findAll();
    }

    public void addFriend(Friend friend) {
        friendRepository.save(friend);
    }

    public void updateFriend(Friend friend) {
        friendRepository.save(friend);
    }

    public void deleteFriend(Integer id) {
        friendRepository.deleteById(id);
    }


}
