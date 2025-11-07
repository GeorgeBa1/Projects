public final class CarLoan extends Loan
{
    String cartype;
    double epitokio;

    public CarLoan(int duration, double amount, String customer, String cartype,double epitokio)
    {
        super(duration,amount,customer);
        this.cartype=cartype;
        this.epitokio=epitokio;
    }

    public CarLoan()
    {
        this.cartype="SUV";
    }

    public void setCartype(String cartype)
    {
        this.cartype = cartype;
    }

    public void setEpiotkio(double epitokio)
    {
        this.epitokio = epitokio;
    }

    public String getCartype()
    {
        return cartype;
    }

    public double getEpitokio()
    {
        return epitokio;
    }

    @Override
    public String toString()
    {
        return super.toString()+" cartype='" + cartype + " epitokio =" +epitokio;
    }

    public double tokos()
    {
        return epitokio*amount;
    }
}
