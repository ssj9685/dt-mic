package kr.easw.dtmic.dashboard;

import jep.*;

public class DtmicDashboard
{

	public static void main(String[] args) throws JepException
	{
		JepConfig config = new JepConfig();
		config.setRedirectOutputStreams(true);
		SharedInterpreter.setConfig(config);
		try (SharedInterpreter interp = new SharedInterpreter())
		{
			interp.exec("print('자바로 파이썬 할꺼야^^')\nprint(1+1)");

		}
	}
}
