package Auth.Authentification.services;

import Auth.Authentification.Entity.Ward;
import Auth.Authentification.Repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WardService {

    @Autowired
    private WardRepository wardRepository;

    public boolean checkId(Integer id){
        return wardRepository.existsById(id);
    }

    public void addWard(Ward ward){
        wardRepository.save(ward);
    }

    public List<Ward> selectWards(){
        return wardRepository.findAll();
    }

    public Ward getWardById(Long id){
        Optional<Ward> wardOptional = wardRepository.findById(id);
        return wardOptional.orElse(null);
    }

    public void deleteWard(Long id){
        wardRepository.deleteById(id);
    }

    public long countWards() {
        return wardRepository.count();
    }
}
