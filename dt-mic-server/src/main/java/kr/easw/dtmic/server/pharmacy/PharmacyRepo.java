package kr.easw.dtmic.server.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacyRepo extends JpaRepository<PharmacyEntity, String>
{

}
