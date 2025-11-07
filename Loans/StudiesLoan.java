public class StudiesLoan extends Loan
{
    private double fees;

    public StudiesLoan(int duration, double amount, String customer, double fees)
    {
        super(duration,amount,customer);
        this.fees=fees;
    }

    public StudiesLoan()
    {
        this.fees=1500;
    }

    public void setFees(double fees)
    {
        this.fees = fees;
    }

    public double getFees()
    {
        return fees;
    }

    @Override
    public String toString()
    {
        return "fees=" + fees;
    }

    public double tokos()
    {
        return fees*0.50;
    }
}
