package com.example.backend.ServicesImpl;

import com.example.backend.Entities.Roles;
import com.example.backend.Entities.Users;
import com.example.backend.Repository.RolesRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.UsersService;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.ResponseDto;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    UsersRepository usersRepository;

    RolesRepository rolesRepository;

    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository, RolesRepository rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public String saveUserasUser(LoginDto users) {

        List<Users> userList = usersRepository.findAll();

        for(Users user : userList)
        {
            if(users.getEmail().equals(user.getEmail()))
            {
                return "This email already exist.";
            }
        }

        Users users1 = new Users();
        users1.setName(users.getName());
        users1.setEmail(users.getEmail());
        users1.setPassword(users.getPassword());
        Roles roles = rolesRepository.getReferenceById(2L);

        Roles roles1 = users1.getRole();
        if(roles1 == null) {
            roles1 = roles;;
        }
        roles1 = roles;

        users1.setRole(roles1);

        usersRepository.save(users1);

        return "User register successfully";
    }

    @Override
    public void deleteUser(Long id) {
        Users users = usersRepository.getReferenceById(id);
        usersRepository.delete(users);
    }

    @Override
    public List<Users> getAllUser() {
        return usersRepository.findAll();
    }

    @Override
    public Users getUserById(Long id) {
        return usersRepository.getReferenceById(id);
    }

    @Override
    public Users getUserByEmail(String email) {
        List<Users> users = usersRepository.findAll();

        for(Users user : users)
        {
            if(user.getEmail().equals(email))
            {
                return user;
            }
        }

        return null;
    }

    @Override
    public String checkAdminLoginDetail(LoginDto users) {

        Users users1 = getUserByEmail(users.getEmail());

        if(users1 == null)
        {
            return "This user is not exist";
        }
        else {
            if(users1.getPassword().equals(users.getPassword()))
            {
                Roles roles = users1.getRole();

                    if(roles.getRole().equals("ADMIN"))
                    {
                        return "Admin Successfully Login";
                    }

                return "This user is not an Admin";
            }
            else
            {
                return "Please enter correct password";
            }
        }

    }

    @Override
    public ResponseDto checkUserLoginDetail(LoginDto users) {

        Users users1 = getUserByEmail(users.getEmail());
        ResponseDto res = new ResponseDto();

        if(users1 == null)
        {
             res.setResponseData("This user is not exist");
        }
        else {
            if(users1.getPassword().equals(users.getPassword()))
            {
                Roles role = users1.getRole();

                    if(role.getRole().equals("USER")) {
                        res.setUid(users1.getUid());
                        res.setResponseData("User Successfully Login");
                    }
            }
            else
            {
                res.setResponseData("Please enter correct password");
            }
        }
        return res;

    }

    @Override
    public String saveUserasAdmin(LoginDto users) {

        Users users1 = getUserByEmail(users.getEmail());

        Roles roles = rolesRepository.getReferenceById(1L);

        if(users1 == null)
        {
            users1 = new Users();
        }
        Roles roles1 = users1.getRole();

        if(roles1 == null)
        {
            roles1 = new Roles();
        }
        roles1 = roles;

        users1.setRole(roles1);

        usersRepository.save(users1);

        return "Admin register successfully";
    }
}
