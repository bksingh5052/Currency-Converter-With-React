import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState('inr');
  const [to, setTo] = useState('usd');

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo)

  const BackgroundImage = 'https://img.freepik.com/free-vector/gradient-cryptocurrency-concept_23-2149215736.jpg?w=1060&t=st=1694974666~exp=1694975266~hmac=f00d09ebaf9bb5d58f7eb18a49ab71a8967cc853c3d6ad6735eef85549d71de5'

  const swap = ()=>{
    setTo(from)
    setFrom(to)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = ()=>{
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  }

  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('${BackgroundImage}')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={(amount)=>setAmount(amount)}
                                onCurrencyChange={(currency)=>setFrom(currency)}
                                currencyOptions={options}
                                selectCurrency={from}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                            onClick={swap}
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}

                                onCurrencyChange={(currency)=>setTo(currency)}
                                currencyOptions={options}
                                amountDisabled
                                selectCurrency={to}
                                
                            />
                        </div>
                        <button
                        onClick={convert}
                         type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
