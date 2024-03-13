// MemberService.java
package Auth.Authentification.services;

import Auth.Authentification.Entity.Member;
import Auth.Authentification.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public boolean checkId(Integer id){
        return memberRepository.existsById(id);
    }

    public void addMember(Member member){
        memberRepository.save(member);
    }

    public List<Member> selectMembers(){
        return  memberRepository.findAll();
    }

    public Member getMemberById(Long id){
        Optional<Member> memberOptional = memberRepository.findById(id);
        return memberOptional.orElse(null);
    }

    public void deleteMember(Long id){
        memberRepository.deleteById(id);
    }

    public long countMembers() {
        return memberRepository.count();
    }
}
