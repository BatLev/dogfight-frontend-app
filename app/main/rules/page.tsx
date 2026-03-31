"use client";

function RulesSection({ title, children }: any) {
	return (
		<div className="border border-orange-800 p-4">
			<h2 className="text-xl text-orange-800 mb-2">{title}</h2>
			<div className="text-sm leading-relaxed space-y-2">{children}</div>
		</div>
	);
}

export default function Rules() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-200 flex justify-center p-6">
			<div className="w-full max-w-3xl flex flex-col gap-6">

				{/* Title */}
				<div>
					<h1 className="text-3xl text-orange-800 tracking-widest border-b border-orange-800 pb-2">
						DOGFIGHT
					</h1>
					<p className="text-sm text-slate-400 italic mt-2">
						A Tactical Control Skirmish TCG
					</p>
				</div>

				{/* Objective */}
				<RulesSection title="Objective">
					<p>
						Reduce your opponent's <strong>Deck</strong> to 0 cards.
					</p>
					<p>
						If a player must reveal damage from an empty Deck, they lose immediately.
					</p>
				</RulesSection>

				{/* Game Setup */}
				<RulesSection title="Game Setup">
					<ul className="list-disc ml-5 space-y-1">
						<li><strong>Deck Size:</strong> 40 cards</li>
						<li><strong>Starting Hand:</strong> 5 cards</li>
						<li><strong>Max Hand Size:</strong> 7 cards</li>
						<li>Decide the first player randomly</li>
					</ul>
				</RulesSection>

				{/* Card Types */}
				<RulesSection title="Card Types">

					<h3 className="text-orange-800 mt-2">Units</h3>
					<p>Units remain on the Battlefield until destroyed.</p>

					<ul className="list-disc ml-5 space-y-1">
						<li><strong>Power</strong> 🔴 (each red gun = 1 Power)</li>
						<li><strong>Size</strong> 🟦 (each flat blue square = 1 Size)</li>
						<li>Ports on its edges</li>
						<li>abilities under art</li>
					</ul>

					<p className="mt-2">There are two relevant port types:</p>

					<ul className="list-disc ml-5 space-y-1">
						<li><strong>Control Ports</strong> (Input / Output)</li>
						<li><strong>Attack Ports</strong></li>
					</ul>

					<h3 className="text-orange-800 mt-4">Commands</h3>
					<p>Commands resolve once when played.</p>
					<ul className="list-disc ml-5 space-y-1">
						<li>If attached to a Unit, they remain in play</li>
						<li>Otherwise, they go to <strong>Junk</strong></li>
					</ul>

				</RulesSection>

				{/* Battlefield */}
				<RulesSection title="The Battlefield">
					<ul className="list-disc ml-5 space-y-1">
						<li>Unlimited space</li>
						<li>Cards may be placed freely</li>
						<li>Cards may be rotated</li>
						<li>Ports connect only when edges physically touch</li>
					</ul>

					<p className="mt-2">Connections must match correctly:</p>
					<ul className="list-disc ml-5 space-y-1">
						<li>Output ➝ Input</li>
						<li>Any other pairing does nothing</li>
					</ul>
				</RulesSection>

				{/* Control System */}
				<RulesSection title="Control System">
					<p>
						A Unit becomes <strong>Active</strong> only if all required Control Inputs are connected.
					</p>

					<p>If not fully connected, the Unit is <strong>Offline</strong>:</p>

					<ul className="list-disc ml-5 space-y-1">
						<li>Cannot attack</li>
						<li>Cannot use abilities</li>
						<li>Still contributes 🟦 Size</li>
					</ul>

					<p>Control is binary: fully connected or not.</p>
				</RulesSection>

				{/* Turn Structure */}
				<RulesSection title="Turn Structure">

					<h3 className="text-orange-800">🎯 Primary Action</h3>
					<ul className="list-disc ml-5 space-y-1">
						<li>Call (Summon) a Unit</li>
						<li>Mulligan: shuffle hand into Deck, draw up to 7</li>
					</ul>

					<h3 className="text-orange-800 mt-4">⚙ Secondary Action</h3>
					<ul className="list-disc ml-5 space-y-1">
						<li>One if you used a Primary Action</li>
						<li>Two if you did NOT</li>
					</ul>

					<p className="mt-2">Includes:</p>
					<ul className="list-disc ml-5 space-y-1">
						<li>Activate an ability</li>
						<li>Untap a Unit</li>
						<li>Resolve special abilities</li>
					</ul>

				</RulesSection>

				{/* Tapping */}
				<RulesSection title="Tapping">
					<ul className="list-disc ml-5 space-y-1">
						<li>Do NOT contribute 🔴 Power</li>
						<li>DO contribute 🟦 Size</li>
						<li>Cannot use abilities</li>
					</ul>

					<p className="mt-2">
						Units untap only through a Secondary Action unless stated otherwise.
					</p>
				</RulesSection>

				{/* Combat */}
				<RulesSection title="Combat">

					<h3 className="text-orange-800">Step 1 — Threshold</h3>
					<p>
						If your 🔴 Power exceeds opponent’s 🟦 Size, combat triggers.
					</p>

					<h3 className="text-orange-800 mt-4">Step 2 — Lock Control</h3>
					<p>
						Control connections lock. Destroyed providers cause Units to go Offline.
					</p>

					<h3 className="text-orange-800 mt-4">Step 3 — Commit Attackers</h3>
					<p>
						Tap Units until their Power meets the Damage Difference.
					</p>

					<h3 className="text-orange-800 mt-4">Step 4 — Deal Damage</h3>
					<p>
						Opponent reveals cards equal to the Damage Difference.
					</p>

					<ul className="list-disc ml-5 space-y-1">
						<li>Trap → activates</li>
						<li>Otherwise → hand or Junk</li>
					</ul>

				</RulesSection>

				{/* Junk */}
				<RulesSection title="Junk">
					<p>The discard pile is called <strong>Junk</strong>.</p>
				</RulesSection>

				{/* Win */}
				<RulesSection title="Winning the Game">
					<p>
						If a player must reveal damage from an empty Deck, they lose immediately.
					</p>
				</RulesSection>

			</div>
		</div>
	);
}
