package com.g4appdev.bookKeepers.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.bookKeepers.entity.LibraryUserEntity;
import com.g4appdev.bookKeepers.repository.LibraryUserRepository;




@Service
public class LibraryUserService {

    @Autowired
    private LibraryUserRepository lrepo;

    public LibraryUserEntity postUserRecord(LibraryUserEntity lib) {
        return lrepo.save(lib);
    }

    public List<LibraryUserEntity> getAllUsers() {
        return lrepo.findAll();
    }
    
    @SuppressWarnings("finally")
    public LibraryUserEntity putUserDetails(int id, LibraryUserEntity newUserDetails) {
    	LibraryUserEntity user = new LibraryUserEntity();
    	try {
    		user = lrepo.findById(id).get();
    		
    		user.setFname(newUserDetails.getFname());
    		user.setLname(newUserDetails.getLname());
    		user.setMname(newUserDetails.getMname());
    		user.setCourse(newUserDetails.getCourse());
    		user.setEmail(newUserDetails.getEmail());
    		user.setPhone(newUserDetails.getPhone());
    	}catch(NoSuchElementException nex) {
    		throw new NameNotFoundException("User" + id + "not found");
    	}finally {
    		return lrepo.save(user);
    	}
    }
    
   public String deleteUser(int id) {
	   String msg = "";
	   if (lrepo.findById(id)!=null){
		   lrepo.deleteById(id);
		   msg = "User Record successfully deleted!";
	   }else {
		   msg = id + "NOT found!";
	   }
	   return msg;
   }
   
   
   
}