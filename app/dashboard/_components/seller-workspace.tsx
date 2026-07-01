import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  PackageCheck,
  ShoppingBag,
  Tag,
} from "lucide-react";

const products = [
  {
    name: "Structured Linen Jacket",
    sku: "AR-LJ-001",
    price: "$220",
    stock: 14,
    status: "Published",
  },
  {
    name: "Italian Leather Oxford",
    sku: "AR-OX-014",
    price: "$184",
    stock: 5,
    status: "Published",
  },
  {
    name: "Sculpted Mini Bag",
    sku: "AR-MB-008",
    price: "$96",
    stock: 0,
    status: "Out of stock",
  },
];
const orders = [
  {
    id: "AR-48392017",
    customer: "Amara K.",
    total: "$220",
    status: "Preparing",
  },
  {
    id: "AR-48391842",
    customer: "Tobi A.",
    total: "$184",
    status: "Ready to ship",
  },
  {
    id: "AR-48390112",
    customer: "Leila M.",
    total: "$192",
    status: "Delivered",
  },
];
const card =
  "rounded-3xl border border-border bg-card p-5 text-card-foreground";

export default function SellerWorkspace({
  section,
}: {
  section: "overview" | "products" | "orders" | "pricing" | "inventory";
}) {
  if (section === "products")
    return (
      <Panel
        title="Products"
        description="Create, publish and maintain every piece listed in Aurela’s central catalog."
      >
        <Table
          headings={["Product", "SKU", "Price", "Stock", "Status"]}
          rows={products.map((item) => [
            item.name,
            item.sku,
            item.price,
            String(item.stock),
            item.status,
          ])}
        />
        <Action>Add product</Action>
      </Panel>
    );
  if (section === "orders")
    return (
      <Panel
        title="Orders"
        description="Prepare seller fulfilments and keep customers informed through verified events."
      >
        <Table
          headings={["Order", "Customer", "Total", "Status"]}
          rows={orders.map((item) => [
            item.id,
            item.customer,
            item.total,
            item.status,
          ])}
        />
      </Panel>
    );
  if (section === "pricing")
    return (
      <Panel
        title="Pricing"
        description="Review prices, planned promotions and marketplace fees."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Average price" value="$167" icon={Tag} />
          <Metric label="Active promotions" value="2" icon={CircleDollarSign} />
          <Metric
            label="Commission estimate"
            value="$428"
            icon={ArrowUpRight}
          />
        </div>
        <div className={`${card} mt-4`}>
          <h3 className="font-semibold">Pricing guidance</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Final prices, promotion windows and commission calculations must be
            validated by the commerce service before publication.
          </p>
        </div>
      </Panel>
    );
  if (section === "inventory")
    return (
      <Panel
        title="Inventory"
        description="Understand what is available, reserved and approaching its reorder point."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Available units" value="19" icon={Boxes} />
          <Metric label="Reserved" value="4" icon={PackageCheck} />
          <Metric label="Low stock" value="2" icon={AlertTriangle} />
        </div>
        <div className={`${card} mt-4`}>
          <Table
            headings={["Product", "Available", "Status"]}
            rows={products.map((item) => [
              item.name,
              String(item.stock),
              item.stock === 0
                ? "Restock required"
                : item.stock < 6
                  ? "Low stock"
                  : "Healthy",
            ])}
          />
        </div>
      </Panel>
    );
  return (
    <>
      <div className="grid w-full gap-4 p-2 md:grid-cols-3">
        <Metric label="Published products" value="24" icon={ShoppingBag} />
        <Metric label="Open orders" value="8" icon={PackageCheck} />
        <Metric label="Inventory units" value="146" icon={Boxes} />
      </div>
      <div className="w-full p-2 xl:w-2/3">
        <div className={card}>
          <h2 className="text-xl font-semibold">Recent orders</h2>
          <div className="mt-5">
            <Table
              headings={["Order", "Customer", "Total", "Status"]}
              rows={orders.map((item) => [
                item.id,
                item.customer,
                item.total,
                item.status,
              ])}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-2 xl:w-1/3">
        <div className={`${card} flex min-h-72 flex-col`}>
          <CircleDollarSign className="h-8 w-8" />
          <h2 className="mt-8 text-2xl font-semibold">
            Your products, one marketplace.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Your shop is the private workspace behind products sold through
            Aurela’s shared storefront.
          </p>
        </div>
      </div>
    </>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-2">
      <section className={card}>
        <h2 className="text-3xl font-semibold tracking-[-.04em]">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-7">{children}</div>
      </section>
    </div>
  );
}
function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Boxes;
}) {
  return (
    <div className={card}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-8 text-4xl font-semibold">{value}</div>
    </div>
  );
}
function Table({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="text-xs uppercase tracking-[.14em] text-muted-foreground">
          <tr>
            {headings.map((value) => (
              <th
                key={value}
                className="border-b border-border px-3 py-3 font-medium"
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((value, cell) => (
                <td
                  key={`${index}-${cell}`}
                  className="border-b border-border px-3 py-4 last:font-medium"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Action({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
    >
      {children}
    </button>
  );
}
