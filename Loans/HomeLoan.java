public class HomeLoan extends Loan
{
    private float sqm;

    public HomeLoan(int duration, double amount, String customer,float sqm)
    {
        super(duration, amount, customer);
        this.sqm=sqm;
    }

    public HomeLoan()
    {
        this.sqm=120;
    }

    public void setSqm(float sqm)
    {
        this.sqm = sqm;
    }
    public float getSqm()
    {
        return this.sqm;
    }

    @Override
    public String toString()
    {
        return "sqm=" + sqm;
    }

    public double tokos()
    {
        return sqm*10;
    }
}
