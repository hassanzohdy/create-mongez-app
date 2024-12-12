import { trans } from "@mongez/localization";
import { type FormControlProps } from "@mongez/react-form";
import { InputLabel } from "design-system/components/Form/InputLabel";
import { NumberInput } from "design-system/components/Form/NumberInput";
import { SelectInput } from "design-system/components/Form/Select";

function CountryImage({ isoCode2 }: { isoCode2: string }) {
  return (
    <img
      src={`https://flagcdn.com/16x12/${isoCode2}.png`}
      width="16"
      height="12"
      alt={`${isoCode2} flag`}
    />
  );
}

const country = (
  isoCode2: string,
  callingCode: string,
  isoCode3: string,
  phoneValidationRegex: string,
  phonePlaceholder: string,
  image: string = `https://flagcdn.com/16x12/${isoCode2}.png`,
) => ({
  isoCode2,
  callingCode,
  isoCode3,
  phoneValidationRegex,
  phonePlaceholder,
  image,
});

const countriesList = [
  country("ad", "+376", "AND", "^(\\+376)?[0-9]{6}$", "123456"),
  country("ae", "+971", "ARE", "^(\\+971|0)?[0-9]{8}$", "0501234567"),
  country("af", "+93", "AFG", "^(\\+93)?[0-9]{9}$", "701234567"),
  country("ag", "+1", "ATG", "^(\\+1)?[0-9]{10}$", "2681234567"),
  country("ai", "+1", "AIA", "^(\\+1)?[0-9]{10}$", "2641234567"),
  country("al", "+355", "ALB", "^(\\+355)?[0-9]{9}$", "671234567"),
  country("am", "+374", "ARM", "^(\\+374)?[0-9]{8}$", "77123456"),
  country("ao", "+244", "AGO", "^(\\+244)?[0-9]{9}$", "923123456"),
  country("ar", "+54", "ARG", "^(\\+54)?[0-9]{10}$", "91123456789"),
  country("as", "+1", "ASM", "^(\\+1)?[0-9]{10}$", "6841234567"),
  country("at", "+43", "AUT", "^(\\+43)?[0-9]{10}$", "6641234567"),
  country("au", "+61", "AUS", "^(\\+61)?[0-9]{9}$", "412345678"),
  country("az", "+994", "AZE", "^(\\+994)?[0-9]{9}$", "501234567"),
  country("ba", "+387", "BIH", "^(\\+387)?[0-9]{8}$", "61123456"),
  country("bb", "+1", "BRB", "^(\\+1)?[0-9]{10}$", "2461234567"),
  country("bd", "+880", "BGD", "^(\\+880)?[0-9]{10}$", "1712345678"),
  country("be", "+32", "BEL", "^(\\+32)?[0-9]{9}$", "471234567"),
  country("bf", "+226", "BFA", "^(\\+226)?[0-9]{8}$", "70123456"),
  country("bg", "+359", "BGR", "^(\\+359)?[0-9]{9}$", "871234567"),
  country("bh", "+973", "BHR", "^(\\+973)?[0-9]{8}$", "36001234"),
  country("bi", "+257", "BDI", "^(\\+257)?[0-9]{8}$", "79123456"),
  country("bj", "+229", "BEN", "^(\\+229)?[0-9]{8}$", "90123456"),
  country("bl", "+652", "BLM", "^(\\+590)?[0-9]{9}$", "690123456"),
  country("bn", "+673", "BRN", "^(\\+673)?[0-9]{7}$", "7123456"),
  country("bo", "+591", "BOL", "^(\\+591)?[0-9]{8}$", "71234567"),
  country("br", "+55", "BRA", "^(\\+55)?[0-9]{11}$", "11912345678"),
  country("bs", "+1", "BHS", "^(\\+1)?[0-9]{10}$", "2421234567"),
  country("bt", "+975", "BTN", "^(\\+975)?[0-9]{8}$", "17123456"),
  country("bw", "+267", "BWA", "^(\\+267)?[0-9]{8}$", "71123456"),
  country("by", "+375", "BLR", "^(\\+375)?[0-9]{9}$", "291234567"),
  country("bz", "+501", "BLZ", "^(\\+501)?[0-9]{7}$", "6221234"),
  country("ca", "+1", "CAN", "^(\\+1)?[0-9]{10}$", "4161234567"),
  country("cd", "+243", "COD", "^(\\+243)?[0-9]{9}$", "991234567"),
  country("cf", "+236", "CAF", "^(\\+236)?[0-9]{8}$", "70123456"),
  country("cg", "+242", "COG", "^(\\+242)?[0-9]{9}$", "061234567"),
  country("ch", "+41", "CHE", "^(\\+41)?[0-9]{9}$", "791234567"),
  country("ci", "+225", "CIV", "^(\\+225)?[0-9]{8}$", "01123456"),
  country("cl", "+56", "CHL", "^(\\+56)?[0-9]{9}$", "912345678"),
  country("cm", "+237", "CMR", "^(\\+237)?[0-9]{9}$", "671234567"),
  country("cn", "+86", "CHN", "^(\\+86)?[0-9]{11}$", "13123456789"),
  country("co", "+57", "COL", "^(\\+57)?[0-9]{10}$", "3212345678"),
  country("cr", "+506", "CRI", "^(\\+506)?[0-9]{8}$", "83123456"),
  country("cu", "+53", "CUB", "^(\\+53)?[0-9]{8}$", "51234567"),
  country("cv", "+238", "CPV", "^(\\+238)?[0-9]{7}$", "9912345"),
  country("cy", "+357", "CYP", "^(\\+357)?[0-9]{8}$", "96123456"),
  country("cz", "+420", "CZE", "^(\\+420)?[0-9]{9}$", "601234567"),
  country("de", "+49", "DEU", "^(\\+49)?[0-9]{10}$", "15123456789"),
  country("dj", "+253", "DJI", "^(\\+253)?[0-9]{8}$", "77123456"),
  country("dk", "+45", "DNK", "^(\\+45)?[0-9]{8}$", "20123456"),
  country("dm", "+1", "DMA", "^(\\+1)?[0-9]{10}$", "7671234567"),
  country("do", "+1", "DOM", "^(\\+1)?[0-9]{10}$", "8091234567"),
  country("dz", "+213", "DZA", "^(\\+213)?[0-9]{9}$", "551234567"),
  country("ec", "+593", "ECU", "^(\\+593)?[0-9]{9}$", "991234567"),
  country("ee", "+372", "EST", "^(\\+372)?[0-9]{8}$", "51234567"),
  country("eg", "+20", "EGY", "^(\\+20)?[0-9]{10}$", "1012345678"),
  country("er", "+291", "ERI", "^(\\+291)?[0-9]{7}$", "7123456"),
  country("es", "+34", "ESP", "^(\\+34)?[0-9]{9}$", "612345678"),
  country("et", "+251", "ETH", "^(\\+251)?[0-9]{9}$", "911234567"),
  country("fi", "+358", "FIN", "^(\\+358)?[0-9]{9}$", "401234567"),
  country("fj", "+679", "FJI", "^(\\+679)?[0-9]{7}$", "7012345"),
  country("fm", "+691", "FSM", "^(\\+691)?[0-9]{7}$", "3501234"),
  country("fr", "+33", "FRA", "^(\\+33)?[0-9]{9}$", "612345678"),
  country("ga", "+241", "GAB", "^(\\+241)?[0-9]{7}$", "6012345"),
  country("gb", "+44", "GBR", "^(\\+44)?[0-9]{10}$", "7123456789"),
  country("gd", "+1", "GRD", "^(\\+1)?[0-9]{10}$", "4731234567"),
  country("ge", "+995", "GEO", "^(\\+995)?[0-9]{9}$", "555123456"),
  country("gh", "+233", "GHA", "^(\\+233)?[0-9]{9}$", "241234567"),
  country("gm", "+220", "GMB", "^(\\+220)?[0-9]{7}$", "3012345"),
  country("gn", "+224", "GIN", "^(\\+224)?[0-9]{9}$", "621234567"),
  country("gq", "+240", "GNQ", "^(\\+240)?[0-9]{9}$", "222123456"),
  country("gr", "+30", "GRC", "^(\\+30)?[0-9]{10}$", "6912345678"),
  country("gt", "+502", "GTM", "^(\\+502)?[0-9]{8}$", "51234567"),
  country("gu", "+1", "GUM", "^(\\+1)?[0-9]{10}$", "6711234567"),
  country("gw", "+245", "GNB", "^(\\+245)?[0-9]{7}$", "5012345"),
  country("gy", "+592", "GUY", "^(\\+592)?[0-9]{7}$", "6012345"),
  country("hk", "+852", "HKG", "^(\\+852)?[0-9]{8}$", "51234567"),
  country("hn", "+504", "HND", "^(\\+504)?[0-9]{8}$", "91234567"),
  country("hr", "+385", "HRV", "^(\\+385)?[0-9]{9}$", "912345678"),
  country("ht", "+509", "HTI", "^(\\+509)?[0-9]{8}$", "34123456"),
  country("hu", "+36", "HUN", "^(\\+36)?[0-9]{9}$", "201234567"),
  country("id", "+62", "IDN", "^(\\+62)?[0-9]{10,11}$", "81234567890"),
  country("ie", "+353", "IRL", "^(\\+353)?[0-9]{9}$", "851234567"),
  country("il", "+972", "ISR", "^(\\+972)?[0-9]{9}$", "501234567"),
  country("in", "+91", "IND", "^(\\+91)?[0-9]{10}$", "9123456789"),
  country("iq", "+964", "IRQ", "^(\\+964)?[0-9]{10}$", "7912345678"),
  country("ir", "+98", "IRN", "^(\\+98)?[0-9]{10}$", "9123456789"),
  country("is", "+354", "ISL", "^(\\+354)?[0-9]{7}$", "6112345"),
  country("it", "+39", "ITA", "^(\\+39)?[0-9]{10}$", "3123456789"),
  country("jm", "+1", "JAM", "^(\\+1)?[0-9]{10}$", "8761234567"),
  country("jo", "+962", "JOR", "^(\\+962)?[0-9]{9}$", "791234567"),
  country("jp", "+81", "JPN", "^(\\+81)?[0-9]{10}$", "9012345678"),
  country("ke", "+254", "KEN", "^(\\+254)?[0-9]{9}$", "712345678"),
  country("kg", "+996", "KGZ", "^(\\+996)?[0-9]{9}$", "701234567"),
  country("kh", "+855", "KHM", "^(\\+855)?[0-9]{9}$", "91234567"),
  country("ki", "+686", "KIR", "^(\\+686)?[0-9]{5}$", "31234"),
  country("km", "+269", "COM", "^(\\+269)?[0-9]{7}$", "3212345"),
  country("kn", "+1", "KNA", "^(\\+1)?[0-9]{10}$", "8691234567"),
  country("kp", "+850", "PRK", "^(\\+850)?[0-9]{9}$", "191234567"),
  country("kr", "+82", "KOR", "^(\\+82)?[0-9]{10}$", "1012345678"),
  country("kw", "+965", "KWT", "^(\\+965)?[0-9]{8}$", "50123456"),
  country("kz", "+7", "KAZ", "^(\\+7)?[0-9]{10}$", "7012345678"),
  country("la", "+856", "LAO", "^(\\+856)?[0-9]{9}$", "2021234567"),
  country("lb", "+961", "LBN", "^(\\+961)?[0-9]{8}$", "71123456"),
  country("lc", "+1", "LCA", "^(\\+1)?[0-9]{10}$", "7581234567"),
  country("li", "+423", "LIE", "^(\\+423)?[0-9]{9}$", "661234567"),
  country("lk", "+94", "LKA", "^(\\+94)?[0-9]{9}$", "712345678"),
  country("lr", "+231", "LBR", "^(\\+231)?[0-9]{8}$", "770123456"),
  country("ls", "+266", "LSO", "^(\\+266)?[0-9]{8}$", "50123456"),
  country("lt", "+370", "LTU", "^(\\+370)?[0-9]{8}$", "61234567"),
  country("lu", "+352", "LUX", "^(\\+352)?[0-9]{9}$", "621234567"),
  country("lv", "+371", "LVA", "^(\\+371)?[0-9]{8}$", "29123456"),
  country("ly", "+218", "LBY", "^(\\+218)?[0-9]{9}$", "912345678"),
  country("ma", "+212", "MAR", "^(\\+212)?[0-9]{9}$", "612345678"),
  country("mc", "+377", "MCO", "^(\\+377)?[0-9]{8}$", "61234567"),
  country("md", "+373", "MDA", "^(\\+373)?[0-9]{8}$", "62123456"),
  country("me", "+382", "MNE", "^(\\+382)?[0-9]{8}$", "67123456"),
  country("mf", "+590", "MAF", "^(\\+590)?[0-9]{9}$", "690123456"),
  country("mg", "+261", "MDG", "^(\\+261)?[0-9]{9}$", "321234567"),
  country("mh", "+692", "MHL", "^(\\+692)?[0-9]{7}$", "2351234"),
  country("mk", "+389", "MKD", "^(\\+389)?[0-9]{8}$", "71234567"),
  country("ml", "+223", "MLI", "^(\\+223)?[0-9]{8}$", "70123456"),
  country("mm", "+95", "MMR", "^(\\+95)?[0-9]{9}$", "912345678"),
  country("mn", "+976", "MNG", "^(\\+976)?[0-9]{8}$", "88123456"),
  country("mo", "+853", "MAC", "^(\\+853)?[0-9]{8}$", "66123456"),
  country("mp", "+1", "MNP", "^(\\+1)?[0-9]{10}$", "6701234567"),
  country("mr", "+222", "MRT", "^(\\+222)?[0-9]{8}$", "22123456"),
  country("mt", "+356", "MLT", "^(\\+356)?[0-9]{8}$", "99123456"),
  country("mu", "+230", "MUS", "^(\\+230)?[0-9]{8}$", "57123456"),
  country("mv", "+960", "MDV", "^(\\+960)?[0-9]{7}$", "7712345"),
  country("mw", "+265", "MWI", "^(\\+265)?[0-9]{9}$", "991234567"),
  country("mx", "+52", "MEX", "^(\\+52)?[0-9]{10}$", "5512345678"),
  country("my", "+60", "MYS", "^(\\+60)?[0-9]{9}$", "123456789"),
  country("mz", "+258", "MOZ", "^(\\+258)?[0-9]{9}$", "821234567"),
  country("na", "+264", "NAM", "^(\\+264)?[0-9]{9}$", "811234567"),
  country("ne", "+227", "NER", "^(\\+227)?[0-9]{8}$", "93123456"),
  country("ng", "+234", "NGA", "^(\\+234)?[0-9]{10}$", "8123456789"),
  country("ni", "+505", "NIC", "^(\\+505)?[0-9]{8}$", "81234567"),
  country("nl", "+31", "NLD", "^(\\+31)?[0-9]{9}$", "612345678"),
  country("no", "+47", "NOR", "^(\\+47)?[0-9]{8}$", "41234567"),
  country("np", "+977", "NPL", "^(\\+977)?[0-9]{10}$", "9812345678"),
  country("nr", "+674", "NRU", "^(\\+674)?[0-9]{7}$", "5551234"),
  country("nz", "+64", "NZL", "^(\\+64)?[0-9]{9}$", "212345678"),
  country("om", "+968", "OMN", "^(\\+968)?[0-9]{8}$", "90123456"),
  country("pa", "+507", "PAN", "^(\\+507)?[0-9]{8}$", "61234567"),
  country("pe", "+51", "PER", "^(\\+51)?[0-9]{9}$", "912345678"),
  country("pg", "+675", "PNG", "^(\\+675)?[0-9]{8}$", "71234567"),
  country("ph", "+63", "PHL", "^(\\+63)?[0-9]{10}$", "9123456789"),
  country("pk", "+92", "PAK", "^(\\+92)?[0-9]{10}$", "3012345678"),
  country("pl", "+48", "POL", "^(\\+48)?[0-9]{9}$", "512345678"),
  country("pm", "+508", "SPM", "^(\\+508)?[0-9]{6}$", "411234"),
  country("pr", "+1", "PRI", "^(\\+1)?[0-9]{10}$", "7871234567"),
  country("pt", "+351", "PRT", "^(\\+351)?[0-9]{9}$", "912345678"),
  country("pw", "+680", "PLW", "^(\\+680)?[0-9]{7}$", "2771234"),
  country("py", "+595", "PRY", "^(\\+595)?[0-9]{9}$", "961234567"),
  country("qa", "+974", "QAT", "^(\\+974)?[0-9]{8}$", "33123456"),
  country("ro", "+40", "ROU", "^(\\+40)?[0-9]{9}$", "712345678"),
  country("rs", "+381", "SRB", "^(\\+381)?[0-9]{8}$", "61234567"),
  country("ru", "+7", "RUS", "^(\\+7)?[0-9]{10}$", "9123456789"),
  country("rw", "+250", "RWA", "^(\\+250)?[0-9]{9}$", "781234567"),
  country("sa", "+966", "SAU", "^(\\+966)?[0-9]{9}$", "501234567"),
  country("sb", "+677", "SLB", "^(\\+677)?[0-9]{7}$", "7421234"),
  country("sc", "+248", "SYC", "^(\\+248)?[0-9]{7}$", "2512345"),
  country("sd", "+249", "SDN", "^(\\+249)?[0-9]{9}$", "911234567"),
  country("se", "+46", "SWE", "^(\\+46)?[0-9]{9}$", "701234567"),
  country("sg", "+65", "SGP", "^(\\+65)?[0-9]{8}$", "81234567"),
  country("sh", "+290", "SHN", "^(\\+290)?[0-9]{4}$", "1234"),
  country("si", "+386", "SVN", "^(\\+386)?[0-9]{8}$", "31234567"),
  country("sk", "+421", "SVK", "^(\\+421)?[0-9]{9}$", "912345678"),
  country("sl", "+232", "SLE", "^(\\+232)?[0-9]{8}$", "76123456"),
  country("sm", "+378", "SMR", "^(\\+378)?[0-9]{10}$", "0549881234"),
  country("sn", "+221", "SEN", "^(\\+221)?[0-9]{9}$", "701234567"),
  country("so", "+252", "SOM", "^(\\+252)?[0-9]{8}$", "61234567"),
  country("sr", "+597", "SUR", "^(\\+597)?[0-9]{7}$", "7412345"),
  country("ss", "+211", "SSD", "^(\\+211)?[0-9]{9}$", "921234567"),
  country("st", "+239", "STP", "^(\\+239)?[0-9]{7}$", "2221234"),
  country("sv", "+503", "SLV", "^(\\+503)?[0-9]{8}$", "70123456"),
  country("sy", "+963", "SYR", "^(\\+963)?[0-9]{9}$", "933123456"),
  country("sz", "+268", "SWZ", "^(\\+268)?[0-9]{8}$", "76123456"),
  country("td", "+235", "TCD", "^(\\+235)?[0-9]{8}$", "63123456"),
  country("tg", "+228", "TGO", "^(\\+228)?[0-9]{8}$", "90123456"),
  country("th", "+66", "THA", "^(\\+66)?[0-9]{9}$", "812345678"),
  country("tj", "+992", "TJK", "^(\\+992)?[0-9]{9}$", "917123456"),
  country("tk", "+690", "TKL", "^(\\+690)?[0-9]{4}$", "1234"),
  country("tl", "+670", "TLS", "^(\\+670)?[0-9]{7}$", "7721234"),
  country("tm", "+993", "TKM", "^(\\+993)?[0-9]{8}$", "65123456"),
  country("tn", "+216", "TUN", "^(\\+216)?[0-9]{8}$", "20123456"),
  country("to", "+676", "TON", "^(\\+676)?[0-9]{5}$", "77123"),
  country("tr", "+90", "TUR", "^(\\+90)?[0-9]{10}$", "5012345678"),
  country("tt", "+1", "TTO", "^(\\+1)?[0-9]{10}$", "8681234567"),
  country("tv", "+688", "TUV", "^(\\+688)?[0-9]{5}$", "90123"),
  country("tz", "+255", "TZA", "^(\\+255)?[0-9]{9}$", "621234567"),
  country("ua", "+380", "UKR", "^(\\+380)?[0-9]{9}$", "501234567"),
  country("ug", "+256", "UGA", "^(\\+256)?[0-9]{9}$", "712345678"),
  country("us", "+1", "USA", "^(\\+1)?[0-9]{10}$", "2025550123"),
  country("uy", "+598", "URY", "^(\\+598)?[0-9]{9}$", "91234567"),
  country("uz", "+998", "UZB", "^(\\+998)?[0-9]{9}$", "912345678"),
  country("va", "+379", "VAT", "^(\\+379)?[0-9]{9}$", "123456789"),
  country("vc", "+1", "VCT", "^(\\+1)?[0-9]{10}$", "7841234567"),
  country("ve", "+58", "VEN", "^(\\+58)?[0-9]{10}$", "4123456789"),
  country("vi", "+1", "VIR", "^(\\+1)?[0-9]{10}$", "3401234567"),
  country("vn", "+84", "VNM", "^(\\+84)?[0-9]{9}$", "912345678"),
  country("vu", "+678", "VUT", "^(\\+678)?[0-9]{7}$", "5912345"),
  country("ws", "+685", "WSM", "^(\\+685)?[0-9]{5}$", "72123"),
  country("ye", "+967", "YEM", "^(\\+967)?[0-9]{9}$", "712345678"),
  country("za", "+27", "ZAF", "^(\\+27)?[0-9]{9}$", "712345678"),
  country("zm", "+260", "ZMB", "^(\\+260)?[0-9]{9}$", "971234567"),
  country("zw", "+263", "ZWE", "^(\\+263)?[0-9]{9}$", "712345678"),
];

export type PhoneNumberInputProps = FormControlProps & {
  countryCodeName?: string;
  onCountryCodeChange?: (countryCode: string) => void;
};

const countryLabel = (callingCode: string, isoCode2: string) => (
  <div className="flex items-center gap-2 text-xs">
    <CountryImage isoCode2={isoCode2} />
    {trans(`countries.${isoCode2}`)} ({callingCode})
  </div>
);

export default function PhoneNumberInput({
  countryCodeName = "countryCode",
  onCountryCodeChange,
  label,
  id,
  ...props
}: PhoneNumberInputProps) {
  const inputId = id || `${props.name}-country-code-input`;
  return (
    <>
      <InputLabel required={props.required} htmlFor={inputId}>
        {label}
      </InputLabel>
      <div className="flex">
        <div>
          <SelectInput
            classes={{
              heading: "w-auto border-e-0 rounded-e-none",
            }}
            placeholder="Select Country"
            virtualized
            renderSelectedOption={country => (
              <div className="flex items-center gap-2 text-xs">
                <CountryImage isoCode2={country.isoCode2} />
                {country.callingCode}
              </div>
            )}
            required={props.required}
            name={countryCodeName}
            filter={(text: string, option) => {
              text = text.toLowerCase();

              return (
                trans(`countries.${option.isoCode2}`)
                  .toLowerCase()
                  .includes(text) ||
                option.isoCode2.toLowerCase().startsWith(text) ||
                option.callingCode.toLowerCase().startsWith(text) ||
                option.isoCode3.toLowerCase().startsWith(text)
              );
            }}
            onChange={onCountryCodeChange}
            options={countriesList.map(country => ({
              ...country,
              value: country.isoCode2,
              label: countryLabel(country.callingCode, country.isoCode2),
            }))}
          />
        </div>
        <div className="flex-1">
          <NumberInput
            id={inputId}
            className="rounded-s-none border-s-0"
            {...props}
          />
        </div>
      </div>
    </>
  );
}