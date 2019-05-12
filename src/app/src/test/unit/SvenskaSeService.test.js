const { parse } = require('node-html-parser')
const {
    processSvenskaSeRequest, determineWordType,
    buildNoun, buildAdjective, buildVerb } = require("../../service/SvenskaSeService.js")

describe("Parsing verbs", () => {
    it("can derive wordtype", () => {
        expect(determineWordType(parse(verbResponse))).toEqual("VERB")
    })

    it("can build verb", () => {
        expect(buildVerb(parse(verbResponse).querySelectorAll(".lemma")[0])).toEqual({
            infinitive: "stänga",
            present_tense: "stänger",
            preterite: "stängde",
            imperative: "stäng",
            supinum: "stängt"
        })
    })
})

describe("Parsing adjectives", () => {
    it("can derive wordtype", () => {
        expect(determineWordType(parse(adjectiveResponse))).toEqual("ADJ")
    })

    it("Can build adjective 'svart'", () => {
        expect(buildAdjective(parse(adjectiveResponse))).toEqual({
            singular_utrum_indefinite: "svart",
            singular_neutrum_indefinite: "svart",
            singular_definite: "svarta",
            plural: "svarta",
            comparative: "svartare",
            superlative: "svartast"
        })
    })

    it("Can build adjective 'liten'", () => {
        expect(buildAdjective(parse(adjectiveResponseLiten))).toEqual({
            singular_utrum_indefinite: "liten",
            singular_neutrum_indefinite: "litet",
            singular_definite: "lilla",
            plural: "små",
            comparative: "mindre",
            superlative: "minst"
        })
    })

    it("can build adjective from verb", () => {
        expect(buildAdjective(parse(verbResponse))).toEqual({
            singular_utrum_indefinite: "stängd",
            singular_neutrum_indefinite: "stängt",
            singular_definite: "stängda",
            plural: "stängda",
            comparative: "",
            superlative: ""
        })
    })

    it("Can build adjective without comparative and superlative", () => {
        expect(buildAdjective(parse(adjectiveResponseEnda).querySelectorAll(".lemma")[0])).toEqual({
            singular_utrum_indefinite: "enda",
            singular_neutrum_indefinite: "enda",
            singular_definite: "enda",
            plural: "enda",
            comparative: "",
            superlative: ""
        })
    })

    it("Can build adjective without positive, comparative and superlative", () => {
        expect(buildAdjective(parse(adjectiveResponseFel).querySelectorAll(".lemma")[1])).toEqual({
            singular_utrum_indefinite: "fel",
            singular_neutrum_indefinite: "fel",
            singular_definite: "fel",
            plural: "fel",
            comparative: "",
            superlative: ""
        })
    })
})

describe("Parsing nouns", () => {
    it("can derive wordtype", () => {
        expect(determineWordType(parse(nounResponseEtt))).toEqual("NOUN")
        expect(determineWordType(parse(nounResponseEn))).toEqual("NOUN")
    })

    it("Can build noun response with wordtype 'ett'", () => {
        expect(buildNoun(parse(nounResponseEtt).querySelectorAll(".lemma")[0])).toEqual({
            noun_type: "ett",
            singular_indefinite: "rum",
            singular_definite: "rummet",
            plural_indefinite: "rum",
            plural_definite: "rummen"
        })
    })

    it("Can build noun response with wordtype 'en'", () => {
        expect(buildNoun(parse(nounResponseEn).querySelectorAll(".lemma")[0])).toEqual({
            noun_type: "en",
            singular_indefinite: "flicka",
            singular_definite: "flickan",
            plural_indefinite: "flickor",
            plural_definite: "flickorna"
        })
    })
})

describe("processSvenskaSeRequest", () => {
    it("noun, do not expect wordtype", () => {
        expect(processSvenskaSeRequest(null, null, nounResponseEn, null)).toEqual([
            "NOUN", {
                noun_type: "en",
                singular_indefinite: "flicka",
                singular_definite: "flickan",
                plural_indefinite: "flickor",
                plural_definite: "flickorna"
            }
        ])
    })
    it("verb, do not expect wordtype", () => {
        expect(processSvenskaSeRequest(null, null, verbResponse, null)).toEqual([
            "VERB", {
                infinitive: "stänga",
                present_tense: "stänger",
                preterite: "stängde",
                imperative: "stäng",
                supinum: "stängt"
            }
        ])
    })
    it("adjective, do not expect wordtype", () => {
        expect(processSvenskaSeRequest(null, null, adjectiveResponseLiten, null)).toEqual([
            "ADJ", {
                singular_utrum_indefinite: "liten",
                singular_neutrum_indefinite: "litet",
                singular_definite: "lilla",
                plural: "små",
                comparative: "mindre",
                superlative: "minst"
            }
        ])
    })
    it ("another adjective, do not expect wordtype", () => {

        expect(processSvenskaSeRequest(null, null, adjectiveResponse, null)).toEqual([
            "ADJ", {
                singular_utrum_indefinite: "svart",
                singular_neutrum_indefinite: "svart",
                singular_definite: "svarta",
                plural: "svarta",
                comparative: "svartare",
                superlative: "svartast"
            }
        ])
    })

    it("verb, with expectation", () => {
        expect(processSvenskaSeRequest(null, null, nounResponseEn, "verb")).toEqual([
            "VERB", {
                infinitive: "flicka",
                present_tense: "flickar",
                preterite: "flickade",
                imperative: "flicka",
                supinum: "flickat"
            }
        ])
    })

    it("adjective from verb, obviously with expectation", () => {
        expect(processSvenskaSeRequest(null, null, verbResponse, "adj")).toEqual([
            "ADJ", {
                singular_utrum_indefinite: "stängd",
                singular_neutrum_indefinite: "stängt",
                singular_definite: "stängda",
                plural: "stängda",
                comparative: "",
                superlative: ""
            }
        ])
    })
})

const verbResponse = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">stänga</span><div class="lemma" id="lnr93034"><span class="grundform">stänga</span>
<a class="ordklass">verb</a>
<span class="bojning">stängde stängt </span><span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr305896"><span class="def">till­sluta; av­sluta verksamheten</span><span class="rak">: ​</span><span class="syntex">stänga dörren</span><span class="rak">; ​</span><span class="syntex">affären stänger kl. 6</span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning93034"><tr><th class="ordformth" colspan="2"><i>Finita former</i></th></tr><tr><td class="ordform"><a><b><span class="bform">stänger</span></b></a></td><td class="ledtext">presens aktiv</td></tr><tr><td class="ordform"><a><b><span class="bform">stängs</span></b></a> (<a><span class="bform">stänges</span></a>)</td><td class="ledtext">presens passiv</td></tr><tr><td class="ordform"><b><span class="bform">stängde</span></b></td><td class="ledtext">preteritum aktiv</td></tr><tr><td class="ordform"><b><span class="bform">stängdes</span></b></td><td class="ledtext">preteritum passiv</td></tr><tr><td class="ordform"><a><b><span class="bform">stäng</span></b></a></td><td class="ledtext">imperativ aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stängas</span></b></td><td class="ledtext">infinitiv passiv</td></tr><tr><td class="ordform"><i>har/hade</i> <b><span class="bform">stängt</span></b></td><td class="ledtext">supinum aktiv</td></tr><tr><td class="ordform"><i>har/hade</i> <b><span class="bform">stängts</span></b></td><td class="ledtext">supinum passiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">stängande</span></b></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">stängd</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">stängt</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">stängda</span></b> + substantiv</td></tr></table></div><div class="lemma" id="lnr479170"><span class="homonr_ptv"></span><span class="grundform_ptv">stänga av</span>
<span class="lexem"><span class="lexnr">1 </span><span class="lexemid" id="xnr479171"><span class="def">spärra av</span></span></span><span class="lexem"><span class="lexnr">2 </span><span class="lexemid" id="xnr479173"><span class="def">manövrera till vilo­läge</span><span class="rak">: ​</span><span class="syntex">stänga av tv:n</span></span></span><span class="lexem"><span class="lexnr">3 </span><span class="lexemid" id="xnr479176"><span class="def">inte låta del­ta <span class="pt">i tävlingar</span></span><span class="rak">: ​</span><span class="syntex">stänga av <span class="rakxs">el.</span> <span class="pt"><span class="rakxs">(sällan)</span></span>  <a class="hvid" target="_parent" href="/saol/?hv=lnr4664"><span class="hvord"><span class="hvhomo"></span>avstänga</span></a> ngn</span></span></span><div class="visainte" id="bojning479170"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga av</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><a><b><span class="bform">avstängande</span></b></a></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <a><b><span class="bform">avstängd</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <a><b><span class="bform">avstängt</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <a><b><span class="bform">avstängda</span></b></a> + substantiv</td></tr></div></div><div class="lemma" id="lnr473301"><span class="homonr_ptv"></span><span class="grundform_ptv">stänga inne</span>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr473302"><span class="syntex">stänga inne ngn/ngt</span></span></span><div class="visainte" id="bojning473301"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga inne</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">innestängande</span></b></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">innestängd</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">innestängt</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">innestängda</span></b> + substantiv</td></tr></div></div><div class="lemma" id="lnr479179"><span class="homonr_ptv"></span><span class="grundform_ptv">stänga ner</span>
<span class="lexem"><span class="lexnr">1 </span><span class="lexemid" id="xnr479180"><span class="def"><span class="pt">om börs o.d. vid stängning på efter­middagen:</span> ha förlorat i samman­lagt värde</span><span class="rak">: ​</span><span class="syntex">Stockholmsbörsen stängde ner 1,6 procent</span></span></span><span class="lexem"><span class="lexnr">2 </span><span class="lexemid" id="xnr479187"><span class="def">spärra <span class="pt">webb­sida e.d.</span></span></span></span><div class="visainte" id="bojning479179"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga ner</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">nerstängande</span></b></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">nerstängd</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">nerstängt</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">nerstängda</span></b> + substantiv</td></tr></div></div><div class="lemma" id="lnr479183"><span class="homonr_ptv"></span><span class="grundform_ptv">stänga upp</span>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr479184"><span class="def"><span class="pt">om börs e.d. vid stängning på efter­middagen:</span> ha vunnit i samman­lagt värde</span><span class="rak">: ​</span><span class="syntex">Stockholmsbörsen stängde upp 0,7 procent</span></span></span><div class="visainte" id="bojning479183"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga upp</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">uppstängande</span></b></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">uppstängd</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">uppstängt</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">uppstängda</span></b> + substantiv</td></tr></div></div><div class="lemma" id="lnr474717"><span class="homonr_ptv"></span><span class="grundform_ptv">stänga ute</span>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr474718"><span class="def"><span class="pt">äv.</span> inte låta vara med, frysa ut</span><span class="rak">: ​</span><span class="syntex">stänga ute <span class="rakxs">el.</span>  <a class="hvid" target="_parent" href="/saol/?hv=lnr105290"><span class="hvord"><span class="hvhomo"></span>utestänga</span></a> ngn</span></span></span><div class="visainte" id="bojning474717"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">stänga ute</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><a><b><span class="bform">utestängande</span></b></a></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <a><b><span class="bform">utestängd</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <a><b><span class="bform">utestängt</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <a><b><span class="bform">utestängda</span></b></a> + substantiv</td></tr></div></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=3029298&pz=7" onClick="tracklink('panel','tabb','/saol/?id=3029298&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const nounResponseEtt = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">rum</span><div class="lemma" id="lnr76656"><span class="homonr">1</span><span class="grundform">rum</span>
<span class="uttal">[rum´]</span>
<a class="ordklass">substantiv</a>
<span class="bojning">~met<span class="bt">; </span><span class="pt">pl. </span>~, <span class="pt">best. </span><span class="pt">pl. </span>~men </span><span class="lexem"><span class="lexnr">1 </span><span class="lexemid" id="xnr272348"><span class="def">större, av­gränsat delutrymme i hus <span class="pt">el.</span> lägenhet</span><span class="rak">: ​</span><span class="syntex">tre rum och kök</span></span></span><span class="lexem"><span class="lexnr">2 </span><span class="lexemid" id="xnr462390"><span class="fkom">knappast pl.</span><span class="rakxs">; ​</span><span class="def">ut­rymme <span class="pt">i all­mänhet</span></span><span class="rak">: ​</span><span class="syntex">lämna rum för ngt</span><span class="rak">; ​</span><span class="syntex">i första rummet</span><span class="pf"> <span class="bt">i första hand, främst</span></span><span class="rak">; ​</span><span class="syntex">äga rum</span><span class="pf"> <span class="bt">hända</span></span></span></span><span class="anm">​ – Nästan alla sammansättn. med <span class="pi">rums-</span> hör till <span class="pi"><span class="hvhomo">1</span>rum 1</span>.</span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning76656"><tr><th class="ordformth" colspan="2"><i>Singular</i></th></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">rum</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">rums</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">rummet</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">rummets</span></b></td><td class="ledtext">bestämd form genitiv</td></tr><tr><th class="ordformth" colspan="2"><i>Plural</i></th></tr><tr><td class="ordform"><b><span class="bform">rum</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><b><span class="bform">rums</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">rummen</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">rummens</span></b></td><td class="ledtext">bestämd form genitiv</td></tr></table></div><div class="lemma" id="lnr76682"><span class="homonr">2</span><span class="grundform">rum</span>
<span class="uttal">[rum´]</span>
<a class="ordklass">adjektiv</a>
<span class="bojning">~t ~ma </span><span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr272403"><span class="syntex">rum sjö</span><span class="pf"> <span class="bt">öppen sjö</span></span><span class="rak">; ​</span><span class="syntex">rum vind</span><span class="pf"> <span class="bt">gynnsam, akterlig vind</span></span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning76682"><tr><th class="ordformth" colspan="2"><i>Positiv</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">rum</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">rumt</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">rumma</span></b> + substantiv</td></tr></table></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=2511621&pz=7" onClick="tracklink('panel','tabb','/saol/?id=2511621&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const nounResponseEn = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">flicka</span><div class="lemma" id="lnr20240"><span class="homonr">1</span><span class="grundform">flicka</span>
<a class="ordklass">substantiv</a>
<span class="bojning">~n flickor </span><span class="lexem"></span><span class="anm">​ – I sammansättn. <span class="pi">flick-</span>, ngn gång <span class="pi">flicke-</span>; alla så­dana sammansättn. hör till <span class="pi"><span class="hvhomo">1</span>flicka</span>.</span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning20240"><tr><th class="ordformth" colspan="2"><i>Singular</i></th></tr><tr><td class="ordform"><i>en</i> <b><span class="bform">flicka</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><i>en</i> <b><span class="bform">flickas</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">flickan</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">flickans</span></b></td><td class="ledtext">bestämd form genitiv</td></tr><tr><th class="ordformth" colspan="2"><i>Plural</i></th></tr><tr><td class="ordform"><b><span class="bform">flickor</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><b><span class="bform">flickors</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">flickorna</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">flickornas</span></b></td><td class="ledtext">bestämd form genitiv</td></tr></table></div><div class="lemma" id="lnr20264"><span class="homonr">2</span><span class="grundform">flicka</span>
<a class="ordklass">verb</a>
<span class="bojning">~de ~t </span><span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr156695"><span class="def">lappa <span class="pt">skor</span></span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning20264"><tr><th class="ordformth" colspan="2"><i>Finita former</i></th></tr><tr><td class="ordform"><b><span class="bform">flickar</span></b></td><td class="ledtext">presens aktiv</td></tr><tr><td class="ordform"><b><span class="bform">flickas</span></b></td><td class="ledtext">presens passiv</td></tr><tr><td class="ordform"><b><span class="bform">flickade</span></b></td><td class="ledtext">preteritum aktiv</td></tr><tr><td class="ordform"><b><span class="bform">flickades</span></b></td><td class="ledtext">preteritum passiv</td></tr><tr><td class="ordform"><b><span class="bform">flicka</span></b></td><td class="ledtext">imperativ aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">flicka</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">flickas</span></b></td><td class="ledtext">infinitiv passiv</td></tr><tr><td class="ordform"><i>har/hade</i> <b><span class="bform">flickat</span></b></td><td class="ledtext">supinum aktiv</td></tr><tr><td class="ordform"><i>har/hade</i> <b><span class="bform">flickats</span></b></td><td class="ledtext">supinum passiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">flickande</span></b></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">flickad</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">flickat</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">flickade</span></b> + substantiv</td></tr></table></div><div class="lemma" id="lnr453960"><span class="homonr_ptv"></span><span class="grundform_ptv">flicka in</span>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr453961"><span class="def">flika in</span><span class="rak">: ​</span><span class="syntex">flicka in <span class="rakxs">el.</span>  <a class="hvid" target="_parent" href="/saol/?hv=lnr37579"><span class="hvord"><span class="hvhomo"></span>inflicka</span></a> en kommentar</span></span></span><div class="visainte" id="bojning453960"><tr><th class="ordformth" colspan="2"><i>Infinita former</i></th></tr><tr><td class="ordform"><i>att</i> <b><span class="bform">flicka in</span></b></td><td class="ledtext">infinitiv aktiv</td></tr><tr><th class="ordformth" colspan="2"><i>Presens particip</i></th></tr><tr><td class="ordform" colspan="2"><a><b><span class="bform">inflickande</span></b></a></td></tr><tr><th class="ordformth" colspan="2"><i>Perfekt particip</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <a><b><span class="bform">inflickad</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <a><b><span class="bform">inflickat</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <a><b><span class="bform">inflickade</span></b></a> + substantiv</td></tr></div></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=0703884&pz=7" onClick="tracklink('panel','tabb','/saol/?id=0703884&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const adjectiveResponse = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">svart</span><div class="lemma" id="lnr93789"><span class="homonr">1</span><span class="grundform">svart</span>
<a class="ordklass">adjektiv</a><span class="pt">; </span><span class="bojning"><span class="pt">n. </span>~, ~a </span><span class="lexem"><span class="lexnr">1 </span><span class="lexemid" id="xnr307466"><span class="def">helt mörk i färgen</span></span></span><span class="lexem"><span class="lexnr">2 </span><span class="lexemid" id="xnr465182"><span class="def">tvivelaktig, <span class="pt">halvt</span> o­laglig, förbjuden</span><span class="rak">: ​</span><span class="syntex">svarta börsen</span><span class="rak">; ​</span><span class="syntex">svart arbets­kraft</span><span class="rak">; ​</span><span class="syntex">(stå på) svarta listan</span><span class="pf"> <span class="bt">lista över personer etc. man varnar för <span class="pt">el.</span> vill boj­kotta</span></span><span class="rak">; ​</span><span class="syntex">familjens svarta får</span><span class="pf"> <span class="bt">familje­medlem som har lyckats mindre bra i livet</span></span></span></span><span class="anm">​ – Nästan alla sammansättn. med <span class="pi">svart-</span> hör till <span class="pi">svart 1</span>.</span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning93789"><tr><th class="ordformth" colspan="2"><i>Positiv</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">svart</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">svart</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">svarta</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den</i> <b><span class="bform">svarte</span></b> + maskulint substantiv</td></tr><tr><th class="ordformth" colspan="2"><i>Komparativ</i></th></tr><tr><td class="ordform" colspan="2"><i>en/ett/den/det/de</i> <b><span class="bform">svartare</span></b> + substantiv</td></tr><tr><th class="ordformth" colspan="2"><i>Superlativ</i></th></tr><tr><td class="ordform" colspan="2"><i>är</i> <b><span class="bform">svartast</span></b></td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">svartaste</span></b> + substantiv</td></tr></table></div><div class="lemma" id="lnr365436"><span class="homonr">2</span><span class="grundform">svart</span>
<a class="ordklass">oböjligt substantiv</a>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr365437"><span class="def">svart färg</span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning365436"><tr><th class="ordformth" colspan="2"><i>Singular</i></th></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">svart</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">svarts</span></b></td><td class="ledtext">obestämd form genitiv</td></tr></table></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=3054749&pz=7" onClick="tracklink('panel','tabb','/saol/?id=3054749&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const adjectiveResponseLiten = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">liten</span><div class="lemma" id="lnr52425"><span class="grundform">liten</span>
<a class="ordklass">adjektiv</a>
<span class="bojning">litet, <span class="pt">best. </span>lille lilla<span class="bt">; </span><span class="pt">pl. </span>små<span class="bt">; </span>mindre minst </span><span class="lexem"></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning52425"><tr><th class="ordformth" colspan="2"><i>Positiv</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">liten</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <a><b><span class="bform">litet</span></b></a> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det</i> <b><span class="bform">lilla</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den</i> <b><span class="bform">lille</span></b> + maskulint substantiv</td></tr><tr><td class="ordform" colspan="2"><i>de</i> <a><b><span class="bform">små</span></b></a> + substantiv</td></tr><tr><th class="ordformth" colspan="2"><i>Komparativ</i></th></tr><tr><td class="ordform" colspan="2"><i>en/ett/den/det/de</i> <b><span class="bform">mindre</span></b> + substantiv</td></tr><tr><th class="ordformth" colspan="2"><i>Superlativ</i></th></tr><tr><td class="ordform" colspan="2"><i>är</i> <a><b><span class="bform">minst</span></b></a></td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">minsta</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den</i> <b><span class="bform">minste</span></b> + maskulint substantiv</td></tr></table></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=1729484&pz=7" onClick="tracklink('panel','tabb','/saol/?id=1729484&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const adjectiveResponseEnda = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">enda</span><div class="lemma" id="lnr16962"><span class="grundform">enda</span>
<a class="ordklass">adjektiv</a>
<span class="bojning">ende, <span class="pt">vard. </span><span class="pt">superl. </span>endaste </span><span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr149889"><span class="syntex">en, ett enda</span><span class="pf"> <span class="bt">bara en, ett</span></span><span class="rak">; ​</span><span class="syntex">han är ende sonen</span><span class="rak">; ​</span><span class="syntex">han är den ende som bor kvar</span><span class="pf"> <span class="bt">bara han bor kvar</span></span><span class="rak">; ​</span><span class="syntex">inte en endaste en</span><span class="pf"> <span class="bt">ingen alls</span></span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning16962"><tr><th class="ordformth" colspan="2"><i>Positiv</i></th></tr><tr><td class="ordform" colspan="2"><i>en</i> <b><span class="bform">enda</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>ett</i> <b><span class="bform">enda</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den/det/de</i> <b><span class="bform">enda</span></b> + substantiv</td></tr><tr><td class="ordform" colspan="2"><i>den</i> <b><span class="bform">ende</span></b> + maskulint substantiv</td></tr><tr><th class="ordformth" colspan="2"><i>Övrig(a) ordform(er)</i></th></tr><tr><td class="ordform"><b><span class="bform">endaste</span></b></td><td class="ledtext">i vissa uttryck</td></tr></table></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=0584060&pz=7" onClick="tracklink('panel','tabb','/saol/?id=0584060&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`

const adjectiveResponseFel = `<div class="cshow">
<div class="saol"><div class="spaltnr"><span class="tryck">tryckår: 2015 &nbsp; </span></div>
<div class="article">
<span class="kt">fel</span><div class="lemma" id="lnr18858"><span class="homonr">1</span><span class="grundform">fel</span>
<a class="ordklass">substantiv</a>
<span class="bojning">~et<span class="bt">; </span><span class="pt">pl. </span>~ </span><span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr153810"><span class="syntex">ett grovt fel</span><span class="rak">; ​</span><span class="syntex">det var fel på låset</span></span></span><span class="anm">​ – De flesta sammansättn. med <span class="pi">fel-</span> kan tänkas höra till <span class="pi"><span class="hvhomo">1</span>fel</span>, <span class="pi"><span class="hvhomo">2</span>fel</span> och <span class="pi"><span class="hvhomo">3</span>fel</span>.</span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning18858"><tr><th class="ordformth" colspan="2"><i>Singular</i></th></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">fel</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><i>ett</i> <b><span class="bform">fels</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">felet</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">felets</span></b></td><td class="ledtext">bestämd form genitiv</td></tr><tr><th class="ordformth" colspan="2"><i>Plural</i></th></tr><tr><td class="ordform"><b><span class="bform">fel</span></b></td><td class="ledtext">obestämd form</td></tr><tr><td class="ordform"><b><span class="bform">fels</span></b></td><td class="ledtext">obestämd form genitiv</td></tr><tr><td class="ordform"><b><span class="bform">felen</span></b></td><td class="ledtext">bestämd form</td></tr><tr><td class="ordform"><b><span class="bform">felens</span></b></td><td class="ledtext">bestämd form genitiv</td></tr></table></div><div class="lemma" id="lnr18860"><span class="homonr">2</span><span class="grundform">fel</span>
<a class="ordklass">oböjligt adjektiv</a>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr153816"><span class="def">o­riktig, felaktig</span><span class="rak">: ​</span><span class="syntex">fel adress</span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning18860"><tr><th class="ordformth" colspan="2"><i>Ordform(er)</i></th></tr><tr><td class="ordform" colspan="2"><b><span class="bform">fel</span></b></td></tr></table></div><div class="lemma" id="lnr18859"><span class="homonr">3</span><span class="grundform">fel</span>
<a class="ordklass">adverb</a>
<span class="lexem"><span class="punkt">• </span><span class="lexemid" id="xnr153812"><span class="def">o­riktigt</span><span class="rak">; ​</span><span class="syntex">ta fel</span><span class="pf"> <span class="bt">miss­ta sig</span></span><span class="rak">; ​</span><span class="syntex">planen slog fel</span><span class="pf"> <span class="bt">planen miss­lyckades</span></span></span></span><span class="expansion" onclick="jQuery(this).toggleClass('collapsed')"></span><table class="tabell" id="bojning18859"><tr><th class="ordformth" colspan="2"><i>Ordform(er)</i></th></tr><tr><td class="ordform"><b><span class="bform">fel</span></b></td><td class="ledtext">adverb</td></tr></table></div></div>

</div>
</div>

<div class="prediv"><span class="pback"> </span> <span class="pahead"><a href="/saol/?id=0655259&pz=7" onClick="tracklink('panel','tabb','/saol/?id=0655259&pz=7'); return false;">Till SAOL</a></span></div>

<script type="text/javascript">
jQuery(function() {
  checkAndHandleWebViewHeight();
});
</script>
`
