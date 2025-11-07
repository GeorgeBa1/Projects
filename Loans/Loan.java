public abstract class Loan
{
    protected int duration;
    protected double amount;
    protected String customer;

    public Loan(int duration, double amount, String customer)
    {
        this.duration=duration;
        this.amount=amount;
        this.customer=customer;
    }

    public Loan()
    {
        this.duration=0;
        this.amount=0;
        this.customer="";
    }
    public void setDuration(int duration)
    {
        this.duration = duration;
    }

    public void setAmount(double amount)
    {
        this.amount = amount;
    }

    public void setCustomer(String customer)
    {
        this.customer = customer;
    }

    public int getDuration()
    {
        return duration;
    }

    public double getAmount()
    {
        return amount;
    }

    public String getCustomer()
    {
        return customer;
    }

    @Override
    public String toString()
    {
        return "Loan{" + "duration=" + duration + ", amount=" + amount + ", customer='" + customer + '\'' + '}';
    }

     public abstract double tokos();

}
