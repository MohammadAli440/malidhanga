  
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return <button data-cal-namespace="30min"
    data-cal-link="mohammadali-dhanga-neqrco/30min"
    
    data-cal-config='{"layout":"month_view","theme":"auto"}'
  >Click me</button>;
};
  