// src/utils/seedData.ts
import { Idea, IdeaType, Department } from "@/types/idea";

export const SEED_IDEAS: Omit<Idea, "id" | "refNo">[] = [
  {
    employeeId: "MD001",
    employeeName: "Amit Bhalla",
    employeeDept: "Management",
    submissionDate: new Date("2026-01-10").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "operations",
    description: `<h3>Cost Improvem ent Strategy</h3>
<ul>
<li><strong>Material Cost Optimization:</strong> Cost improvement through material cost + logistics + value engineering / negotiation / process improvements</li>
<li><strong>Operations Cost:</strong> OT + incentives reduction via productivity / process improvements</li>
<li><strong>HR + Admin Cost:</strong> Right-sizing of teams / structure</li>
</ul>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Meera Nair",
    hodApprovedDate: new Date("2026-01-11").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-01-12").toISOString(),
  },
  {
    employeeId: "EMP101",
    employeeName: "Suman Baliga",
    employeeDept: "Operations",
    submissionDate: new Date("2026-01-12").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "operations",
    description: `<h3>Service Operations Optimization</h3>
<ol>
<li><strong>Contractor Agreements:</strong> Create agreements with contractors & freelancers (region-wise) to reduce service engineer travel + food cost by using local freelancers for breakdown visits</li>
<li><strong>Cross-Department Coordination:</strong> Better coordination between Sales–Projects–Service. Once GA approval is done, service team planning earlier → avoids last-minute contractor cost negotiation</li>
<li><strong>Travel Optimization:</strong> Service & sales travel - prefer night travel where possible → save day time / cost</li>
<li><strong>Digital Transformation:</strong> Reduce printing expenses (digitise travel/tour expense processes)</li>
<li><strong>Hotel Partnerships:</strong> Hotel tie-ups for better corporate rates; admin to book tickets/hotels → cleaner bills</li>
<li><strong>HOTO Automation:</strong> Software for on-time HOTO submission from site</li>
</ol>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Meera Nair",
    hodApprovedDate: new Date("2026-01-13").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-01-14").toISOString(),
  },
  {
    employeeId: "EMP102",
    employeeName: "Mahesh Nikam",
    employeeDept: "Engineering",
    submissionDate: new Date("2026-01-15").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "engineering",
    description: `<h3>Manufacturing Cost Reduction Initiative</h3>
<ol>
<li><strong>Customer Load Testing:</strong> With Sales + Projects support, convince customers to waive load tests / multiple inspections (e.g., painting inspection) → saves contractor + fabrication cost; helps capacity to deliver 2–3 more cranes/month</li>
<li><strong>Equipment Cost Reduction:</strong> Better internal coordination to reduce Hydra cost at Chakan (can't eliminate, but reduce)</li>
<li><strong>Consumables Monitoring:</strong> Monitor consumables at Chakan (paint, welding consumables) + alternate makes/vendors → target ~5% cost saving</li>
</ol>`,
    flowchart: null,
    status: "pending_md",
    hodApprovedBy: "Amit Patel",
    hodApprovedDate: new Date("2026-01-16").toISOString(),
  },
  {
    employeeId: "EMP103",
    employeeName: "Aniket Puranik",
    employeeDept: "Operations",
    submissionDate: new Date("2026-01-18").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "operations",
    description: `<h3>Operations Cost Avoidance Measures</h3>
<ul>
<li><strong>Liquidated Damages:</strong> Avoiding L.D.s / LD-related leakages through better project management</li>
<li><strong>Travel Booking Switch:</strong> Switch travel booking from HMA to alternate for flight tickets & hotel bookings, via Admin + company credit card</li>
<li><strong>Green Transport:</strong> Local transport - promote EVs vs petrol/diesel; EV purchase schemes</li>
<li><strong>Renewable Energy:</strong> Solar panels to reduce electricity cost</li>
<li><strong>Corporate Transport:</strong> Uber tie-up for local & international travel</li>
<li><strong>Export Packing:</strong> Improve packing precision for export goods</li>
</ul>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Meera Nair",
    hodApprovedDate: new Date("2026-01-19").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-01-20").toISOString(),
  },
  {
    employeeId: "EMP104",
    employeeName: "Sourajya",
    employeeDept: "Sales",
    submissionDate: new Date("2026-01-20").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "sales",
    description: `<h3>Sales & Events Cost Optimization</h3>
<ol>
<li><strong>Travel Platform Migration:</strong> Change travel booking from HMA to MMT Biz (domestic + export)</li>
<li><strong>In-house Manufacturing:</strong> Manufacture some key components in-house (rope drum, trolley plates, side plates, fabrication items) to save margin + reduce dependency</li>
<li><strong>Event Duration Reduction:</strong> Reduce duration of Elevate Elite Club trip by 1–2 days</li>
<li><strong>Meeting Optimization:</strong> ABP Meet / Sales Meet - reduce from 4 days to ~2 days; move generic presentations online</li>
<li><strong>Exhibition Strategy:</strong> Do more exhibitions (domestic & exports) in collaboration with ABPs only; restrict OEM participation to one</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP105",
    employeeName: "Akshay",
    employeeDept: "Human Resources",
    submissionDate: new Date("2026-01-22").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "hr",
    description: `<h3>HR & Software Cost Optimization</h3>
<ul>
<li><strong>Organization Structure:</strong> Sharpen the bell curve; audit hierarchy pyramid (avoid being "fat in the middle")</li>
<li><strong>Software License Audit:</strong> Audit and remove unused software licenses (across departments)</li>
<li><strong>Variable Pay Clawback:</strong> Clawback variable pay if sales order not executed in that year (sales team)</li>
<li><strong>Software Renewals:</strong> Negotiate discounted renewals for existing software (e.g., AWS / software services)</li>
</ul>`,
    flowchart: null,
    status: "pending_md",
    hodApprovedBy: "Deepak Joshi",
    hodApprovedDate: new Date("2026-01-23").toISOString(),
  },
  {
    employeeId: "EMP106",
    employeeName: "Vineesh",
    employeeDept: "Operations",
    submissionDate: new Date("2026-01-24").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "operations",
    description: `<h3>Operations Performance Review</h3>
<ol>
<li><strong>Overtime Control:</strong> If sales isn't increasing, why has overtime doubled? Review and control OT expenses</li>
<li><strong>LD Reduction:</strong> Reduce LD expenses (if controllable internally) through better execution</li>
<li><strong>AMC at Sale Time:</strong> Push AMC at product sale time (example: give 1 year free service if it helps; AMC bundled like some solar models)</li>
</ol>`,
    flowchart: null,
    status: "rejected_hod",
    hodApprovedBy: "Meera Nair",
    hodApprovedDate: new Date("2026-01-25").toISOString(),
    hodRemarks:
      "Overtime analysis needs more detailed data before implementation. Please provide monthly OT breakdown vs sales trends.",
  },
  {
    employeeId: "EMP107",
    employeeName: "Nandkishor Varpe",
    employeeDept: "Operations",
    submissionDate: new Date("2026-01-26").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "operations",
    description: `<h3>Operational Process Improvements</h3>
<ol>
<li><strong>FOC Goods Control:</strong> Earlier - invoicing done before packing; box count assumed. New - packing team writes box nos + tag; invoice revalidation after packing; implement checklist control</li>
<li><strong>GT Crane Automation:</strong> Today - 4 manpower for manual girder movement + chain movement. After - motorized automation → save ~2 manpower</li>
<li><strong>Air Compressor Upgrade:</strong> Old compressor → frequent maintenance + spares replacement. Buy new compressor → avoid maintenance/spares cost</li>
</ol>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Meera Nair",
    hodApprovedDate: new Date("2026-01-27").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-01-28").toISOString(),
  },
  {
    employeeId: "EMP108",
    employeeName: "KDF",
    employeeDept: "Sales",
    submissionDate: new Date("2026-01-28").toISOString(),
    ideaType: "revenue_generation",
    functionTheme: "sales",
    description: `<h3>Testing Service Revenue Enhancement</h3>
<p>For customers who use competent person certification: offer load test + test load + competent person approval with nominal charge → saves testing time & cost at Chakan</p>
<p><strong>Additional Benefit:</strong> Avoid last-minute travel rush by planning appointments in advance</p>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP109",
    employeeName: "Harish",
    employeeDept: "Information Technology",
    submissionDate: new Date("2026-01-29").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "it",
    description: `<h3>Software Development Cost Reduction</h3>
<p><strong>Open Source Strategy:</strong> Application development via free open source owner model → save approx 50–60% development cost</p>
<p>Leverage open source frameworks, libraries, and tools for custom application development while maintaining full ownership and control.</p>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Rahul Verma",
    hodApprovedDate: new Date("2026-01-30").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-01-31").toISOString(),
  },
  {
    employeeId: "EMP110",
    employeeName: "Vishal Singh",
    employeeDept: "Information Technology",
    submissionDate: new Date("2026-02-01").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "it",
    description: `<h3>Process Automation Initiative</h3>
<p><strong>Objective:</strong> Automation of day-to-day manual activities to improve resource utilization</p>
<ul>
<li>Identify resources doing manual admin work</li>
<li>Automate their work and deploy resources elsewhere</li>
<li>Improve overall productivity and efficiency</li>
</ul>`,
    flowchart: null,
    status: "pending_md",
    hodApprovedBy: "Rahul Verma",
    hodApprovedDate: new Date("2026-02-02").toISOString(),
  },
  {
    employeeId: "EMP111",
    employeeName: "Rahul C. Mahajan",
    employeeDept: "Engineering",
    submissionDate: new Date("2026-02-02").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "engineering",
    description: `<h3>Hoist Design Cost Reduction</h3>
<ol>
<li><strong>Hoist Motor kW Reduction:</strong> Use 11 kW instead of 15 kW for ~7.5T; Use 13.2 kW instead of 15 kW for 9/10T. Project initiated Aug 2024</li>
<li><strong>HWS Trolley Plate Redesign:</strong> Optimize design to reduce material cost</li>
<li><strong>CPB-P 10T Lower Block Standardisation:</strong> Standardize components for economies of scale</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP112",
    employeeName: "Sadanand",
    employeeDept: "Human Resources",
    submissionDate: new Date("2026-02-03").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "hr",
    description: `<h3>HR & Administrative Cost Control</h3>
<ol>
<li><strong>Employee Travel Control:</strong> Travel as per eligible criteria; Do travel planning in advance</li>
<li><strong>HR Manpower Rationalisation:</strong> If excess manpower in a department → reshuffle to other dept or remove</li>
<li><strong>Government Authority Cost Minimisation:</strong> Optimize processes with government departments</li>
<li><strong>Pantry & Canteen Cost Reduction:</strong> Monitor and reduce unnecessary expenses</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP113",
    employeeName: "Shashikant Prayag",
    employeeDept: "Engineering",
    submissionDate: new Date("2026-02-04").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "engineering",
    description: `<h3>Design Optimization Initiatives</h3>
<ol>
<li><strong>Export Crane Load Test:</strong> Stop extra/in-house load test after 3-month observation period if no issues → saves material/manpower/time; may improve chances of winning orders</li>
<li><strong>Inventory Utilization:</strong> Use inventory items as much as possible in design → reduce new buying + inventory; improve profit</li>
<li><strong>Parts Reduction:</strong> Reduce number of parts and machining items in crane; reduce lead time/cost; reduce crane weight</li>
<li><strong>Gearbox Standardisation:</strong> SCM to share gearbox catalogue + negotiated prices; design to standardise usage → reduce cost + lead time</li>
</ol>`,
    flowchart: null,
    status: "pending_md",
    hodApprovedBy: "Amit Patel",
    hodApprovedDate: new Date("2026-02-05").toISOString(),
  },
  {
    employeeId: "EMP114",
    employeeName: "Manish Dhar",
    employeeDept: "Procurement",
    submissionDate: new Date("2026-02-04").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "procurement",
    description: `<h3>Procurement & Logistics Optimization</h3>
<ol>
<li><strong>Chain Vendor Switch:</strong> Change chain from European to other vendor (Grade 100) without changing selling price</li>
<li><strong>FTL Loads:</strong> Use FTL loads for region-wise orders → save cost; packaging stays in good shape</li>
<li><strong>Ex-works Delivery:</strong> Offer Ex-works delivery as an option with little price reduction</li>
<li><strong>Strategic Acquisition:</strong> Consider acquisition of motor/chain company → margin benefit as a big buyer</li>
<li><strong>Travel Distance Limit:</strong> Limit self-car travel to 150–200 km (assess cost impact)</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP115",
    employeeName: "Omkar Nikam",
    employeeDept: "Finance",
    submissionDate: new Date("2026-02-05").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "finance",
    description: `<h3>Indirect Expenses & Guest House Initiative</h3>
<ol>
<li><strong>Contract Review:</strong> Review contracts for indirect expenses; target reduce by 8–10%</li>
<li><strong>Guest House Approach:</strong> Set up guest house in major cities (HO & RO) for internal employees + visiting customers (identify major locations)</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP116",
    employeeName: "Debi Prasad (DPP)",
    employeeDept: "Procurement",
    submissionDate: new Date("2026-02-05").toISOString(),
    ideaType: "process_improvement",
    functionTheme: "procurement",
    description: `<h3>Procurement Process Excellence</h3>
<ol>
<li><strong>LD Recovery:</strong> Implement systematic LD recovery from vendors</li>
<li><strong>Wastage Reduction:</strong> Reduce wastage due to short & wrong supply</li>
<li><strong>Travel Desk:</strong> Create a centralized travel desk</li>
<li><strong>Team Tracking:</strong> "Know your team" – track whereabouts on field (cost & culture improvement)</li>
<li><strong>Budget Allocation:</strong> Budget allocation on each procurement for better control</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP117",
    employeeName: "Bijay Agrawal",
    employeeDept: "Human Resources",
    submissionDate: new Date("2026-02-06").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "hr",
    description: `<h3>HR Consultancy & FOC Control</h3>
<ol>
<li><strong>Referral Policy:</strong> Implement referral policy to reduce HR consultancy expense</li>
<li><strong>FOC Routing Control:</strong> FOC must be routed through Quality + SCM for debit to vendor (proper authorization process)</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP118",
    employeeName: "Rajesh Sarode",
    employeeDept: "Operations",
    submissionDate: new Date("2026-02-06").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "operations",
    description: `<h3>Manufacturing Process Cost Savings</h3>
<ol>
<li><strong>Paint Standardisation:</strong> Use Mukand Ltd paint in other standard orders with NABL lab testing → inventory cost reduction approx ₹15 lakhs</li>
<li><strong>Rework Reduction:</strong> Avoid repeated in-house rework by implementing design change (process requirement driven rework)</li>
<li><strong>Saturday Working:</strong> Saturday working - give compensatory off → save ₹1500/person instead of overtime payment</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP119",
    employeeName: "Subhra Mitra",
    employeeDept: "Operations",
    submissionDate: new Date("2026-02-06").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "operations",
    description: `<h3>Operational Efficiency Improvements</h3>
<ol>
<li><strong>Paper Reuse:</strong> Use old one-side-printed pages for internal departmental purposes → save approx 6000 pages + cost ~₹2000 per dept</li>
<li><strong>Manpower Restructuring:</strong> Manpower restructuring to reduce OT / reduce manpower count</li>
<li><strong>Wastage Reduction:</strong> Implement systematic wastage reduction measures</li>
</ol>`,
    flowchart: null,
    status: "pending_hod",
  },
  {
    employeeId: "EMP120",
    employeeName: "Rameez",
    employeeDept: "Procurement",
    submissionDate: new Date("2026-02-06").toISOString(),
    ideaType: "cost_savings",
    functionTheme: "procurement",
    description: `<h3>Strategic Procurement Initiatives</h3>
<ol>
<li><strong>Strategic Cable Buying:</strong> Strategic buying of cables (price changes every ~15 days) → target 2–3% benefit via timing/strategy</li>
<li><strong>Plasma Machine Utilization:</strong> Use Chakan plasma machine (night shift) to cut RM → target 2–3% saving in RM cost</li>
<li><strong>Bulk/Cancellation Buying:</strong> Bulk buying / cancellation buying on time to reduce inventory / cash flow impact</li>
<li><strong>Casting Optimization:</strong> ~₹16 lakhs annual savings expected; if new dies + new supplier, can get ~₹3 lakhs benefit in Feb & March</li>
<li><strong>Chain Sourcing:</strong> G1W chain saving ~8%; G80 chain saving ~10–12%. Reference from China; implementable from Feb end</li>
<li><strong>Cost Avoidance:</strong> Buy 3 months stock at old price if ~10% price rise expected</li>
</ol>`,
    flowchart: null,
    status: "completed",
    hodApprovedBy: "Kavita Desai",
    hodApprovedDate: new Date("2026-02-06").toISOString(),
    mdApprovedBy: "Vikram Singh",
    mdApprovedDate: new Date("2026-02-06").toISOString(),
  },
];

export function initializeSeedData(): Idea[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const fy1 = month >= 3 ? year % 100 : (year - 1) % 100;
  const fy2 = fy1 + 1;

  return SEED_IDEAS.map((seed, index) => ({
    ...seed,
    id: crypto.randomUUID(),
    refNo: `${String(fy1).padStart(2, "0")}-${String(fy2).padStart(2, "0")}/${String(index + 1).padStart(4, "0")}`,
  }));
}
