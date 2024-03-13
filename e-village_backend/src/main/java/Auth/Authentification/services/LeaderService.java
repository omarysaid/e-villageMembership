package Auth.Authentification.services;

import Auth.Authentification.Entity.Leader;
import Auth.Authentification.Repository.LeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderService {

    @Autowired
    private LeaderRepository leaderRepository;

    public boolean checkId(Integer id){
        return leaderRepository.existsById(id);
    }

    public void addLeader(Leader leader){
        leaderRepository.save(leader);
    }

    public List<Leader> selectLeaders(){
        return leaderRepository.findAll();
    }

    public Leader getLeaderById(Long id){
        Optional<Leader> leaderOptional = leaderRepository.findById(id);
        return leaderOptional.orElse(null);
    }

    public void deleteLeader(Long id){
        leaderRepository.deleteById(id);
    }

    public long countLeaders() {
        return leaderRepository.count();
    }
}
