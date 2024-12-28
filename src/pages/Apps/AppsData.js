import PurchaseOrder from "../../assets/purchase.svg";
import AssetManagement from "../../assets/asset.svg";
import ProductManagement from "../../assets/product.svg";
import TravelRequest from "../../assets/travel.svg";
import ProjectManagement from "../../assets/project.svg";

const SolutionsDataList = [
    {
        id: "solution-1",
        app: "Purchase Order Management",
        division: "Used by:",
        description: `
        <p>Streamline your procurement process with this solution, designed to manage purchase orders effectively. It enables seamless tracking and approval workflows, ensuring compliance and efficiency.</p>
        <p>From requisition to order fulfillment, the app provides real-time visibility into procurement activities, helping organizations reduce errors and control costs.</p>
        <p>Features:</p>
        <ul>
        <li><strong>Automated workflows:</strong> Simplify approval processes and reduce manual interventions.</li>
        <li><strong>Supplier management:</strong> Maintain a comprehensive supplier database and track performance.</li>
        <li><strong>Budget control:</strong> Set budgets and monitor spending with detailed analytics.</li>
        <li><strong>Order tracking:</strong> Real-time tracking of purchase orders from creation to fulfillment.</li>
        </ul>
        `,
        image: PurchaseOrder,
        author: "Jane Doe"
    },
    {
        id: "solution-2",
        app: "Asset Management",
        division: "Used by:",
        description: `
        <p>Keep track of your organization's assets with this intuitive Asset Management solution. It helps manage the entire lifecycle of assets, from acquisition to disposal.</p>
        <p>The system ensures accurate inventory, minimizes downtime, and optimizes asset utilization with powerful reporting tools.</p>
        <p>Features:</p>
        <ul>
        <li><strong>Lifecycle management:</strong> Track assets from procurement to retirement.</li>
        <li><strong>Maintenance scheduling:</strong> Plan preventive maintenance to minimize breakdowns.</li>
        <li><strong>Inventory tracking:</strong> Real-time visibility into asset inventory and location.</li>
        <li><strong>Reporting tools:</strong> Generate insights to improve asset performance and decision-making.</li>
        </ul>
        `,
        image: AssetManagement,
        author: "John Smith"
    },
    {
        id: "solution-3",
        app: "Product Management",
        division: "Used by:",
        description: `
        <p>Enhance your product lifecycle with a solution tailored for product managers. It helps teams plan, track, and execute product development tasks efficiently.</p>
        <p>The solution supports collaboration across teams, ensuring timely launches and improved product quality.</p>
        <p>Features:</p>
        <ul>
        <li><strong>Roadmap creation:</strong> Plan product milestones and release schedules.</li>
        <li><strong>Team collaboration:</strong> Share updates and communicate with cross-functional teams.</li>
        <li><strong>Progress tracking:</strong> Monitor development stages and identify bottlenecks.</li>
        <li><strong>Customer feedback:</strong> Integrate feedback to refine product features.</li>
        </ul>
        `,
        image: ProductManagement,
        author: "Alice Johnson"
    },
    {
        id: "solution-4",
        app: "Travel Request Management",
        division: "Used by:",
        description: `
        <p>Simplify the travel request process for your organization with this solution. Employees can request, track, and manage travel plans effortlessly.</p>
        <p>The system ensures compliance with travel policies, reduces approval delays, and optimizes travel expenses.</p>
        <p>Features:</p>
        <ul>
        <li><strong>Request automation:</strong> Submit and track travel requests with ease.</li>
        <li><strong>Policy compliance:</strong> Ensure all travel requests adhere to company guidelines.</li>
        <li><strong>Expense tracking:</strong> Monitor travel expenses with detailed reporting.</li>
        <li><strong>Integration with booking:</strong> Book flights, hotels, and transport seamlessly.</li>
        </ul>
        `,
        image: TravelRequest,
        author: "Bob Brown"
    },
    {
        id: "solution-5",
        app: "Project Management",
        division: "Used by:",
        description: `
        <p>Manage projects efficiently with this comprehensive Project Management solution. It enables planning, scheduling, and tracking project activities in real-time.</p>
        <p>From resource allocation to risk management, the solution provides all the tools needed for successful project delivery.</p>
        <p>Features:</p>
        <ul>
        <li><strong>Task management:</strong> Assign, track, and prioritize tasks effortlessly.</li>
        <li><strong>Resource allocation:</strong> Optimize resource usage for maximum efficiency.</li>
        <li><strong>Risk assessment:</strong> Identify and mitigate project risks proactively.</li>
        <li><strong>Gantt charts:</strong> Visualize project timelines and milestones with Gantt charts.</li>
        </ul>
        `,
        image: ProjectManagement,
        author: "Charlie Davis"
    }
];


export default SolutionsDataList;
