package kr.easw.dtmic.server.claimSession;

public enum ClaimSessionPhase
{
	start(1),
	drugPrepComplete(2),
	claim_selectCompany(3),
	claim_createPreview(4),
	claim_takePicture(5),
	claim_createCompPreview(6),
	claim_sendEmail(7),
	complete(8),
	fail(8);
	
	public final int step;
	private ClaimSessionPhase(int step)
	{
		this.step = step;
	}
}
