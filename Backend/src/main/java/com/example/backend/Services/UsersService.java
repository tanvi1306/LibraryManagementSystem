package com.example.backend.Services;

import com.example.backend.Entities.Users;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.ResponseDto;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public interface UsersService {

    public String saveUserasUser(LoginDto users);
    public void deleteUser(Long id);
    public List<Users> getAllUser();
    public Users getUserById(Long id);
    public Users getUserByEmail(String email);
    public String checkAdminLoginDetail(LoginDto users);
    public ResponseDto checkUserLoginDetail(LoginDto users);
    public String saveUserasAdmin(LoginDto users);
}
