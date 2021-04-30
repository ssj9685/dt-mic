package kr.easw.dtmic.server.claimSession;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimSessionRepo extends JpaRepository<ClaimSessionEntity, UUID>
{

}
